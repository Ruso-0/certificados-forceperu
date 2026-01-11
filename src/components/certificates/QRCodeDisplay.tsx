import { QRCodeSVG } from 'qrcode.react'
import { getVerificationUrl } from '../../lib/utils'

interface QRCodeDisplayProps {
  verificationCode: string
  size?: number
  showUrl?: boolean
}

export function QRCodeDisplay({ verificationCode, size = 120, showUrl = true }: QRCodeDisplayProps) {
  const url = getVerificationUrl(verificationCode)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
        <QRCodeSVG
          value={url}
          size={size}
          level="M"
          includeMargin={false}
          bgColor="#ffffff"
          fgColor="#1f2b5d"
        />
      </div>
      {showUrl && (
        <p className="text-xs text-gray-500 text-center max-w-[200px] truncate">
          {url}
        </p>
      )}
    </div>
  )
}

// Function to generate QR code as data URL for PDF
export async function generateQRCodeDataUrl(verificationCode: string): Promise<string> {
  const url = getVerificationUrl(verificationCode)

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const size = 200
    canvas.width = size
    canvas.height = size

    // Use QRCodeCanvas to render to canvas
    import('qrcode').then((QRCode) => {
      QRCode.toDataURL(url, {
        width: size,
        margin: 1,
        color: {
          dark: '#1f2b5d',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      })
        .then(resolve)
        .catch(reject)
    }).catch(() => {
      // Fallback: create a simple placeholder
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#f0f0f0'
        ctx.fillRect(0, 0, size, size)
        ctx.fillStyle = '#888888'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('QR', size / 2, size / 2)
      }
      resolve(canvas.toDataURL())
    })
  })
}
