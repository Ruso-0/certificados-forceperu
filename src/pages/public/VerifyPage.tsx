import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCertificateByCode } from '../../hooks/useCertificates'
import { supabase } from '../../lib/supabase'
import { Card, Icon, Badge } from '../../components/ui'
import { QRCodeDisplay } from '../../components/certificates/QRCodeDisplay'
import { formatDate } from '../../lib/utils'

export function VerifyPage() {
  const { codigo } = useParams<{ codigo: string }>()
  const { certificate, loading, error } = useCertificateByCode(codigo || '')

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

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Icon name="progress_activity" size="xl" className="text-primary animate-spin" />
          <p className="text-gray-500">Verificando certificado...</p>
        </div>
      </div>
    )
  }

  if (error === 'not_found' || !certificate) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="error" size="xl" className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">Certificado No Encontrado</h1>
            <p className="text-gray-500 mb-6">
              El código de verificación <strong className="text-navy">{codigo}</strong> no corresponde a ningún certificado registrado.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <Icon name="warning" size="sm" />
                Posibles causas:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• El código fue ingresado incorrectamente</li>
                <li>• El certificado es falso o no fue emitido por Force Perú</li>
                <li>• El certificado fue eliminado del sistema</li>
              </ul>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Si cree que esto es un error, contacte a Force Perú S.A.C.
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const isRevoked = certificate.status === 'revoked'
  const isValid = certificate.status === 'active'

  return (
    <div className="min-h-screen bg-bg-light py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="shield" size="xl" className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-navy">Force Perú S.A.C.</h1>
          <p className="text-gray-500 text-sm">Sistema de Verificación de Certificados</p>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isValid ? 'bg-green-100' : isRevoked ? 'bg-red-100' : 'bg-yellow-100'
              }`}
            >
              <Icon
                name={isValid ? 'verified' : isRevoked ? 'cancel' : 'schedule'}
                size="xl"
                className={isValid ? 'text-green-600' : isRevoked ? 'text-red-600' : 'text-yellow-600'}
              />
            </div>
            <div className="flex-1">
              <Badge
                variant={isValid ? 'success' : isRevoked ? 'error' : 'warning'}
                size="lg"
                icon={isValid ? 'verified' : isRevoked ? 'cancel' : 'schedule'}
              >
                {isValid ? 'CERTIFICADO VÁLIDO' : isRevoked ? 'CERTIFICADO REVOCADO' : 'CERTIFICADO EXPIRADO'}
              </Badge>
              <p className="text-gray-500 text-sm mt-2">
                Código: {certificate.verification_code}
              </p>
            </div>
          </div>

          {isRevoked && certificate.revocation_reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-red-800 mb-1 flex items-center gap-2">
                <Icon name="info" size="sm" />
                Motivo de Revocación
              </h3>
              <p className="text-red-700 text-sm">{certificate.revocation_reason}</p>
            </div>
          )}
        </Card>

        {/* Certificate Details */}
        <Card className="mb-6">
          <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
            <Icon name="description" size="sm" />
            Datos del Certificado
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Participante</p>
                <p className="font-semibold text-navy text-lg">{certificate.participant_name}</p>
              </div>
              {certificate.participant_dni && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">DNI</p>
                  <p className="font-medium text-navy">{certificate.participant_dni}</p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-1">Curso / Certificación</p>
              <p className="font-semibold text-navy">{certificate.course?.name || 'Curso de Capacitación'}</p>
              {certificate.course?.description && (
                <p className="text-sm text-gray-600 mt-2">{certificate.course.description}</p>
              )}
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificate.start_date && certificate.end_date && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Periodo</p>
                  <p className="font-medium text-navy text-sm">
                    {formatDate(certificate.start_date)} - {formatDate(certificate.end_date)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha de Emisión</p>
                <p className="font-medium text-navy">{formatDate(certificate.issue_date)}</p>
              </div>
              {(certificate.duration_text || certificate.course?.duration_text) && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duración</p>
                  <p className="font-medium text-navy">
                    {certificate.duration_text || certificate.course?.duration_text}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-1">Instructor</p>
              <p className="font-semibold text-navy">{certificate.instructor_name}</p>
              <p className="text-sm text-gray-600">{certificate.instructor_title}</p>
              <p className="text-sm text-gray-500">{certificate.instructor_credentials}</p>
            </div>
          </div>
        </Card>

        {/* QR Code */}
        <Card className="text-center">
          <h2 className="text-lg font-semibold text-navy mb-4">Código QR de Verificación</h2>
          <div className="flex justify-center">
            <QRCodeDisplay verificationCode={certificate.verification_code} size={150} />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Este código QR permite verificar la autenticidad de este certificado.
          </p>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Force Perú S.A.C. - Centro de Formación y Especialización
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Este sistema permite verificar la autenticidad de los certificados emitidos por nuestra institución.
          </p>
        </div>
      </div>
    </div>
  )
}
