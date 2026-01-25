import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, Button, Input, Icon } from '../../components/ui'
import { generateVerificationCode, getVerificationUrl } from '../../lib/utils'

export function QRGeneratorPage() {
  const [code, setCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const qrRef = useRef<HTMLDivElement>(null)

  const handleGenerateNew = () => {
    const newCode = generateVerificationCode()
    setCode(newCode)
    setGeneratedCode(newCode)
  }

  const handleUseCode = () => {
    if (code.trim()) {
      setGeneratedCode(code.trim().toUpperCase())
    }
  }

  const verificationUrl = generatedCode ? getVerificationUrl(generatedCode) : ''

  const downloadQR = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    // Create canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 400
    canvas.width = size
    canvas.height = size

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      // White background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, size, size)

      // Draw QR
      ctx.drawImage(img, 0, 0, size, size)

      // Download
      const link = document.createElement('a')
      link.download = `QR-${generatedCode}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(verificationUrl)
    alert('URL copiada al portapapeles')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('Código copiado al portapapeles')
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Generador de Código QR</h1>
        <p className="text-gray-500">Genera códigos QR para certificados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator Form */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
            <Icon name="qr_code_2" size="sm" />
            Generar Código
          </h2>

          <div className="space-y-4">
            <div>
              <Button
                onClick={handleGenerateNew}
                leftIcon="autorenew"
                className="w-full"
              >
                Generar Nuevo Código
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">o usar código existente</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="FP-2026-XXXXXXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 font-mono"
              />
              <Button
                variant="secondary"
                onClick={handleUseCode}
                disabled={!code.trim()}
              >
                Usar
              </Button>
            </div>
          </div>

          {generatedCode && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Código de Verificación</p>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-mono font-bold text-primary">{generatedCode}</code>
                  <button onClick={copyCode} className="text-gray-400 hover:text-primary transition-colors">
                    <Icon name="content_copy" size="sm" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">URL de Verificación</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-gray-600 break-all">{verificationUrl}</code>
                  <button onClick={copyUrl} className="text-gray-400 hover:text-primary transition-colors shrink-0">
                    <Icon name="content_copy" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* QR Preview */}
        <Card className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2 self-start">
            <Icon name="qr_code_scanner" size="sm" />
            Vista Previa
          </h2>

          {generatedCode ? (
            <>
              <div
                ref={qrRef}
                className="p-6 bg-white rounded-xl border-2 border-gray-100 shadow-sm mb-6"
              >
                <QRCodeSVG
                  value={verificationUrl}
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#1f2b5d"
                />
              </div>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={downloadQR}
                  leftIcon="download"
                  className="flex-1"
                >
                  Descargar PNG
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open(verificationUrl, '_blank')}
                  leftIcon="open_in_new"
                >
                  Probar
                </Button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                El código QR dirige a la página de verificación del certificado
              </p>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="qr_code_2" size="xl" className="text-gray-300" />
              </div>
              <p className="text-gray-400">
                Genera o ingresa un código para ver el QR
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-8">
        <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
          <Icon name="info" size="sm" />
          Instrucciones de Uso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-navy">Genera el código</p>
              <p className="text-sm text-gray-500">Crea un nuevo código o usa uno existente del sistema</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-navy">Descarga el QR</p>
              <p className="text-sm text-gray-500">Descarga la imagen PNG para usar en tu diseño</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-navy">Registra el certificado</p>
              <p className="text-sm text-gray-500">Asegúrate de crear el certificado en el sistema con el mismo código</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
