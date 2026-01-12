import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCertificateByCode } from '../../hooks/useCertificates'
import { supabase } from '../../lib/supabase'
import { Icon } from '../../components/ui'
import { QRCodeDisplay } from '../../components/certificates/QRCodeDisplay'
import { formatDate } from '../../lib/utils'

export function VerifyPage() {
  const { codigo } = useParams<{ codigo: string }>()
  const navigate = useNavigate()
  const [inputCode, setInputCode] = useState('')
  const { certificate, loading, error } = useCertificateByCode(codigo || '')
  const [showAnimation, setShowAnimation] = useState(!!codigo)

  // Log verification attempt
  useEffect(() => {
    if (codigo && !loading) {
      const result = error === 'not_found'
        ? 'not_found'
        : certificate?.status === 'revoked'
        ? 'revoked'
        : certificate?.status === 'expired'
        ? 'expired'
        : 'valid'

      supabase.from('verification_logs').insert({
        verification_code: codigo,
        certificate_id: certificate?.id || null,
        result,
        user_agent: navigator.userAgent,
      }).then(() => {})
    }
  }, [codigo, loading, certificate, error])

  // Finish animation after delay
  useEffect(() => {
    if (codigo && !loading) {
      const timer = setTimeout(() => setShowAnimation(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [codigo, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputCode.trim()) {
      navigate(`/verificar/${inputCode.trim().toUpperCase()}`)
    }
  }

  // Si no hay código, mostrar formulario de búsqueda
  if (!codigo) {
    return (
      <div className="min-h-screen bg-bg py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo-force-peru.png"
                alt="Force Peru"
                className="h-14 mx-auto mb-3"
              />
            </Link>
            <h1 className="font-display text-2xl font-bold text-text">
              Verificar Certificado
            </h1>
            <p className="text-text-muted mt-2">
              Ingresa el código de verificación para validar la autenticidad del certificado
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium text-text mb-2">
                  Código de Verificación
                </label>
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="Ej: FP-2024-XXXXX"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors font-mono text-lg tracking-wider"
                    autoComplete="off"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon name="qr_code_scanner" size="md" className="text-text-light" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputCode.trim()}
                className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon name="verified" size="sm" />
                Verificar Certificado
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-muted text-sm text-center mb-4">
                ¿Eres administrador de Force Perú?
              </p>
              <Link
                to="/intranet"
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="admin_panel_settings" size="sm" />
                Acceder a Intranet
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 bg-info/10 border border-info/20 rounded-lg p-4">
            <h3 className="font-medium text-info mb-2 flex items-center gap-2 text-sm">
              <Icon name="info" size="sm" />
              ¿Dónde encuentro el código?
            </h3>
            <p className="text-text-muted text-sm">
              El código de verificación se encuentra en la parte inferior de tu certificado,
              junto al código QR. Tiene el formato: <span className="font-mono text-secondary">FP-XXXX-XXXXX</span>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link to="/" className="text-secondary hover:text-secondary-light text-sm transition-colors inline-flex items-center gap-1">
              <Icon name="arrow_back" size="xs" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading || showAnimation) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center">
          {/* Loading spinner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-secondary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-secondary rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="verified_user" size="lg" className="text-secondary" />
            </div>
          </div>

          <h2 className="font-display text-xl font-semibold text-text mb-2">
            Verificando Certificado
          </h2>
          <p className="text-text-muted">
            Código: <span className="font-mono text-secondary">{codigo}</span>
          </p>
        </div>
      </div>
    )
  }

  if (error === 'not_found' || !certificate) {
    return (
      <div className="min-h-screen bg-bg py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo-force-peru.png"
                alt="Force Peru"
                className="h-14 mx-auto mb-3"
              />
            </Link>
            <h1 className="font-display text-lg font-semibold text-text">
              Force Perú S.A.C.
            </h1>
            <p className="text-text-muted text-sm">Sistema de Verificación</p>
          </div>

          {/* Error Card */}
          <div className="bg-surface rounded-lg border border-border shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="error" size="xl" className="text-error" />
              </div>
              <h2 className="font-display text-xl font-semibold text-text mb-2">
                Certificado No Encontrado
              </h2>
              <p className="text-text-muted text-sm">
                El código <span className="font-mono text-error bg-error/10 px-2 py-0.5 rounded">{codigo}</span> no corresponde a ningún certificado registrado.
              </p>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-warning mb-2 flex items-center gap-2 text-sm">
                <Icon name="warning" size="sm" />
                Posibles causas:
              </h3>
              <ul className="text-sm text-text-muted space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  El código fue ingresado incorrectamente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  El certificado es falso o no fue emitido por Force Perú
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  El certificado fue eliminado del sistema
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                to="/verificar"
                className="w-full py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="search" size="sm" />
                Intentar con otro código
              </Link>
              <Link
                to="/contacto"
                className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="support_agent" size="sm" />
                Contactar Soporte
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <Link to="/" className="text-secondary hover:text-secondary-light text-sm transition-colors inline-flex items-center gap-1">
              <Icon name="arrow_back" size="xs" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isRevoked = certificate.status === 'revoked'
  const isValid = certificate.status === 'active'

  const statusConfig = isValid
    ? { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success', label: 'CERTIFICADO VÁLIDO', icon: 'verified' }
    : isRevoked
    ? { bg: 'bg-error/10', border: 'border-error/20', text: 'text-error', label: 'CERTIFICADO REVOCADO', icon: 'cancel' }
    : { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning', label: 'CERTIFICADO EXPIRADO', icon: 'schedule' }

  return (
    <div className="min-h-screen bg-bg py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img
              src="/images/logo-force-peru.png"
              alt="Force Peru"
              className="h-14 mx-auto mb-3"
            />
          </Link>
          <h1 className="font-display text-lg font-semibold text-text">Force Perú S.A.C.</h1>
          <p className="text-text-muted text-sm">Sistema de Verificación de Certificados</p>
        </div>

        {/* Status Banner */}
        <div className={`bg-surface rounded-lg border ${statusConfig.border} shadow-sm p-5 mb-5`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${statusConfig.bg} rounded-lg flex items-center justify-center shrink-0`}>
              <Icon name={statusConfig.icon} size="lg" className={statusConfig.text} />
            </div>
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.border} border rounded-md ${statusConfig.text} text-sm font-semibold mb-1`}>
                <Icon name={statusConfig.icon} size="xs" />
                {statusConfig.label}
              </div>
              <p className="text-text-muted text-sm">
                Código: <span className="font-mono text-text">{certificate.verification_code}</span>
              </p>
            </div>
          </div>

          {isRevoked && certificate.revocation_reason && (
            <div className="mt-4 bg-error/10 border border-error/20 rounded-md p-4">
              <h3 className="font-medium text-error mb-1 flex items-center gap-2 text-sm">
                <Icon name="info" size="xs" />
                Motivo de Revocación
              </h3>
              <p className="text-text-muted text-sm">{certificate.revocation_reason}</p>
            </div>
          )}
        </div>

        {/* Certificate Details */}
        <div className="bg-surface rounded-lg border border-border shadow-sm p-5 mb-5">
          <h2 className="font-display text-base font-semibold text-text mb-5 flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary/10 rounded-md flex items-center justify-center">
              <Icon name="description" size="sm" className="text-secondary" />
            </div>
            Datos del Certificado
          </h2>

          <div className="space-y-4">
            {/* Participant */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bg rounded-md p-4">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Participante</p>
                <p className="font-display font-semibold text-text">{certificate.participant_name}</p>
              </div>
              {certificate.participant_dni && (
                <div className="bg-bg rounded-md p-4">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">DNI</p>
                  <p className="font-mono font-semibold text-text">{certificate.participant_dni}</p>
                </div>
              )}
            </div>

            {/* Course */}
            <div className="bg-bg rounded-md p-4">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Curso / Certificación</p>
              <p className="font-display font-semibold text-text">{certificate.course?.name || 'Curso de Capacitación'}</p>
              {certificate.course?.description && (
                <p className="text-text-muted text-sm mt-1">{certificate.course.description}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificate.start_date && certificate.end_date && (
                <div className="bg-bg rounded-md p-4">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Periodo</p>
                  <p className="text-text text-sm font-medium">
                    {formatDate(certificate.start_date)} - {formatDate(certificate.end_date)}
                  </p>
                </div>
              )}
              <div className="bg-bg rounded-md p-4">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Emisión</p>
                <p className="text-text font-medium">{formatDate(certificate.issue_date)}</p>
              </div>
              {(certificate.duration_text || certificate.course?.duration_text) && (
                <div className="bg-bg rounded-md p-4">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Duración</p>
                  <p className="text-text font-medium">
                    {certificate.duration_text || certificate.course?.duration_text}
                  </p>
                </div>
              )}
            </div>

            {/* Instructor */}
            <div className="bg-bg rounded-md p-4">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Instructor</p>
              <p className="font-display font-semibold text-text">{certificate.instructor_name}</p>
              <p className="text-secondary text-sm">{certificate.instructor_title}</p>
              <p className="text-text-muted text-sm">{certificate.instructor_credentials}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-surface rounded-lg border border-border shadow-sm p-5 text-center">
          <h2 className="font-display text-base font-semibold text-text mb-4">Código QR de Verificación</h2>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg border border-border">
              <QRCodeDisplay verificationCode={certificate.verification_code} size={140} />
            </div>
          </div>
          <p className="text-text-muted text-sm">
            Este código QR permite verificar la autenticidad de este certificado.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Force Perú S.A.C. - Centro de Formación y Especialización
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-secondary hover:text-secondary-light text-sm mt-3 transition-colors"
          >
            <Icon name="arrow_back" size="xs" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
