import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../components/auth/AuthProvider'
import { Icon } from '../../components/ui'
import { useCertificateByCode } from '../../hooks/useCertificates'
import { formatDate } from '../../lib/utils'

type Tab = 'login' | 'scanner'

export function IntranetPage() {
  const { user, signIn, loading: authLoading } = useAuthContext()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('login')

  // Login state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Scanner state
  const [scannedCode, setScannedCode] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Certificate verification
  const { certificate, loading: certLoading, error: certError } = useCertificateByCode(scannedCode)

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate('/admin')
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    try {
      await signIn(email, password)
    } catch {
      setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualCode.trim()) {
      setScannedCode(manualCode.trim().toUpperCase())
    }
  }

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsScanning(true)
        scanQRCode()
      }
    } catch {
      alert('No se pudo acceder a la cámara. Verifica los permisos.')
    }
  }

  const stopScanner = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanQRCode)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Simple QR detection - in production use a library like jsQR
    // For now, we'll rely on manual input
    requestAnimationFrame(scanQRCode)
  }

  const clearResult = () => {
    setScannedCode('')
    setManualCode('')
  }

  // Render certificate result
  const renderCertificateResult = () => {
    if (!scannedCode) return null

    if (certLoading) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Verificando certificado...</p>
        </div>
      )
    }

    if (certError === 'not_found' || !certificate) {
      return (
        <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="error" size="xl" className="text-error" />
          </div>
          <h3 className="font-display text-lg font-semibold text-error mb-2">
            Certificado No Válido
          </h3>
          <p className="text-text-muted text-sm mb-4">
            El código <span className="font-mono text-error">{scannedCode}</span> no corresponde a ningún certificado registrado.
          </p>
          <button
            onClick={clearResult}
            className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error-light transition-colors"
          >
            Escanear otro código
          </button>
        </div>
      )
    }

    const isValid = certificate.status === 'active'
    const isRevoked = certificate.status === 'revoked'

    return (
      <div className={`rounded-lg p-6 border ${isValid ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isValid ? 'bg-success/20' : 'bg-error/20'}`}>
            <Icon
              name={isValid ? 'verified' : 'cancel'}
              size="xl"
              className={isValid ? 'text-success' : 'text-error'}
            />
          </div>
          <div>
            <h3 className={`font-display text-lg font-bold ${isValid ? 'text-success' : 'text-error'}`}>
              {isValid ? 'CERTIFICADO VÁLIDO' : isRevoked ? 'CERTIFICADO REVOCADO' : 'CERTIFICADO EXPIRADO'}
            </h3>
            <p className="text-text-muted text-sm font-mono">{certificate.verification_code}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-white/50 rounded-md p-3">
            <p className="text-text-muted text-xs uppercase mb-1">Participante</p>
            <p className="font-semibold text-text">{certificate.participant_name}</p>
            {certificate.participant_dni && (
              <p className="text-sm text-text-muted">DNI: {certificate.participant_dni}</p>
            )}
          </div>

          <div className="bg-white/50 rounded-md p-3">
            <p className="text-text-muted text-xs uppercase mb-1">Curso</p>
            <p className="font-semibold text-text">{certificate.course?.name || 'Curso de Capacitación'}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/50 rounded-md p-3">
              <p className="text-text-muted text-xs uppercase mb-1">Fecha de Emisión</p>
              <p className="font-medium text-text">{formatDate(certificate.issue_date)}</p>
            </div>
            {certificate.duration_text && (
              <div className="bg-white/50 rounded-md p-3">
                <p className="text-text-muted text-xs uppercase mb-1">Duración</p>
                <p className="font-medium text-text">{certificate.duration_text}</p>
              </div>
            )}
          </div>
        </div>

        {isRevoked && certificate.revocation_reason && (
          <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-4">
            <p className="text-error text-sm font-medium">Motivo: {certificate.revocation_reason}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={clearResult}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="qr_code_scanner" size="sm" />
            Escanear otro
          </button>
          <Link
            to={`/verificar/${certificate.verification_code}`}
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="open_in_new" size="sm" />
            Ver detalle
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-primary-dark py-4">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo-force-peru.png"
              alt="Force Peru"
              className="h-10"
            />
            <div>
              <span className="font-display font-bold text-white text-lg block leading-tight">
                FORCE PERÚ
              </span>
              <span className="text-secondary text-xs font-semibold">INTRANET</span>
            </div>
          </Link>
          <Link to="/" className="text-white/70 hover:text-white transition-colors">
            <Icon name="close" size="md" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-primary-light rounded-xl p-1 flex mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-white text-primary shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Icon name="login" size="sm" />
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'scanner'
                ? 'bg-white text-primary shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Icon name="qr_code_scanner" size="sm" />
            Escanear QR
          </button>
        </div>

        {/* Login Tab */}
        {activeTab === 'login' && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="admin_panel_settings" size="xl" className="text-secondary" />
              </div>
              <h1 className="font-display text-xl font-bold text-text">
                Acceso Administrativo
              </h1>
              <p className="text-text-muted text-sm mt-1">
                Ingresa tus credenciales para acceder al panel
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {loginError && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <Icon name="error" size="sm" className="text-error" />
                  <p className="text-error text-sm">{loginError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@forceperu.com"
                      className="w-full px-4 py-3 pl-11 border border-border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                      required
                    />
                    <Icon name="mail" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pl-11 border border-border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                      required
                    />
                    <Icon name="lock" size="sm" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading || authLoading}
                  className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loginLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <Icon name="login" size="sm" />
                      Iniciar Sesión
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-text-muted text-sm">
                ¿Problemas para acceder?{' '}
                <Link to="/contacto" className="text-secondary hover:text-secondary-light transition-colors">
                  Contactar soporte
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <div className="bg-white rounded-xl shadow-xl p-6">
            {scannedCode ? (
              renderCertificateResult()
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="qr_code_scanner" size="xl" className="text-secondary" />
                  </div>
                  <h1 className="font-display text-xl font-bold text-text">
                    Verificar Capacitación
                  </h1>
                  <p className="text-text-muted text-sm mt-1">
                    Escanea el código QR del certificado para verificar su autenticidad
                  </p>
                </div>

                {/* Camera Scanner */}
                <div className="mb-6">
                  <div className="relative aspect-square bg-black rounded-xl overflow-hidden mb-4">
                    {isScanning ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          playsInline
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        {/* Scanner overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-secondary rounded-tl" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-secondary rounded-tr" />
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-secondary rounded-bl" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-secondary rounded-br" />
                          </div>
                        </div>
                        <button
                          onClick={stopScanner}
                          className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <Icon name="close" size="sm" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-bg">
                        <Icon name="qr_code_scanner" size="xl" className="text-text-light mb-4" />
                        <p className="text-text-muted text-sm mb-4">Cámara no activa</p>
                        <button
                          onClick={startScanner}
                          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors flex items-center gap-2"
                        >
                          <Icon name="camera" size="sm" />
                          Activar cámara
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Manual Input */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-text-muted text-sm">o ingresa el código manualmente</span>
                  </div>
                </div>

                <form onSubmit={handleManualVerify}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                      placeholder="FP-2024-XXXXX"
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors font-mono"
                    />
                    <button
                      type="submit"
                      disabled={!manualCode.trim()}
                      className="px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors disabled:opacity-50"
                    >
                      <Icon name="search" size="sm" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
            <Icon name="arrow_back" size="xs" />
            Volver al sitio web
          </Link>
        </div>
      </div>
    </div>
  )
}
