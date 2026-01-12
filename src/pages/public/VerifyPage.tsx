import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCertificateByCode } from '../../hooks/useCertificates'
import { supabase } from '../../lib/supabase'
import { Icon } from '../../components/ui'
import { QRCodeDisplay } from '../../components/certificates/QRCodeDisplay'
import { formatDate } from '../../lib/utils'

export function VerifyPage() {
  const { codigo } = useParams<{ codigo: string }>()
  const { certificate, loading, error } = useCertificateByCode(codigo || '')
  const [showAnimation, setShowAnimation] = useState(true)

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
    if (!loading) {
      const timer = setTimeout(() => setShowAnimation(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading || showAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="text-center relative z-10">
          {/* Animated shield */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-sky-500/20 rounded-full animate-ping" />
            <div className="absolute inset-4 bg-sky-500/30 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-500/40 animate-pulse">
                <Icon name="verified_user" size="xl" className="text-white" />
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Verificando Certificado
          </h2>
          <p className="text-sky-300/80">
            Código: <span className="font-mono text-white">{codigo}</span>
          </p>

          {/* Progress bar */}
          <div className="mt-8 w-64 mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-accent-500 rounded-full animate-[loading_1.5s_ease-in-out]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'not_found' || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10 animate-slide-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <img
                src="/images/logo-force-peru.avif"
                alt="Force Peru"
                className="h-16 mx-auto mb-4 group-hover:scale-105 transition-transform"
              />
            </Link>
            <h1 className="font-display text-xl font-bold text-white">
              Force Perú CEFOESP
            </h1>
            <p className="text-brand-400 text-sm">Sistema de Verificación</p>
          </div>

          {/* Error Card */}
          <div className="glass-dark rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Icon name="error" size="xl" className="text-red-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Certificado No Encontrado
              </h2>
              <p className="text-brand-300 mb-6">
                El código <span className="font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{codigo}</span> no corresponde a ningún certificado registrado.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <Icon name="warning" size="sm" />
                Posibles causas:
              </h3>
              <ul className="text-sm text-amber-300/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  El código fue ingresado incorrectamente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  El certificado es falso o no fue emitido por Force Perú
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  El certificado fue eliminado del sistema
                </li>
              </ul>
            </div>

            <Link
              to="/contacto"
              className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Icon name="support_agent" size="sm" />
              Contactar Soporte
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <Link to="/" className="text-brand-400 hover:text-sky-400 text-sm transition-colors flex items-center justify-center gap-1">
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
    ? { gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'CERTIFICADO VÁLIDO', icon: 'verified' }
    : isRevoked
    ? { gradient: 'from-red-500 to-red-600', bg: 'bg-red-500/20', text: 'text-red-400', label: 'CERTIFICADO REVOCADO', icon: 'cancel' }
    : { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'CERTIFICADO EXPIRADO', icon: 'schedule' }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-8 px-4 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-in-up">
          <Link to="/" className="inline-block group">
            <img
              src="/images/logo-force-peru.avif"
              alt="Force Peru"
              className="h-14 mx-auto mb-3 group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="font-display text-xl font-bold text-white">Force Perú CEFOESP</h1>
          <p className="text-brand-400 text-sm">Sistema de Verificación de Certificados</p>
        </div>

        {/* Status Banner */}
        <div
          className="glass-dark rounded-2xl p-6 mb-6 border border-white/10 animate-slide-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${statusConfig.bg} rounded-2xl flex items-center justify-center shrink-0`}>
              <Icon name={statusConfig.icon} size="xl" className={statusConfig.text} />
            </div>
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${statusConfig.gradient} rounded-lg text-white text-sm font-semibold mb-2`}>
                <Icon name={statusConfig.icon} size="xs" />
                {statusConfig.label}
              </div>
              <p className="text-brand-300 text-sm font-mono">
                Código: {certificate.verification_code}
              </p>
            </div>
          </div>

          {isRevoked && certificate.revocation_reason && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="font-semibold text-red-400 mb-1 flex items-center gap-2 text-sm">
                <Icon name="info" size="xs" />
                Motivo de Revocación
              </h3>
              <p className="text-red-300/80 text-sm">{certificate.revocation_reason}</p>
            </div>
          )}
        </div>

        {/* Certificate Details */}
        <div
          className="glass-dark rounded-2xl p-6 mb-6 border border-white/10 animate-slide-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
              <Icon name="description" size="sm" className="text-sky-400" />
            </div>
            Datos del Certificado
          </h2>

          <div className="space-y-5">
            {/* Participant */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">Participante</p>
                <p className="font-display font-semibold text-white text-lg">{certificate.participant_name}</p>
              </div>
              {certificate.participant_dni && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">DNI</p>
                  <p className="font-mono font-semibold text-white">{certificate.participant_dni}</p>
                </div>
              )}
            </div>

            {/* Course */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">Curso / Certificación</p>
              <p className="font-display font-semibold text-white">{certificate.course?.name || 'Curso de Capacitación'}</p>
              {certificate.course?.description && (
                <p className="text-brand-300 text-sm mt-2">{certificate.course.description}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificate.start_date && certificate.end_date && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">Periodo</p>
                  <p className="text-white text-sm font-medium">
                    {formatDate(certificate.start_date)} - {formatDate(certificate.end_date)}
                  </p>
                </div>
              )}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">Emisión</p>
                <p className="text-white font-medium">{formatDate(certificate.issue_date)}</p>
              </div>
              {(certificate.duration_text || certificate.course?.duration_text) && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">Duración</p>
                  <p className="text-white font-medium">
                    {certificate.duration_text || certificate.course?.duration_text}
                  </p>
                </div>
              )}
            </div>

            {/* Instructor */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-brand-400 text-xs uppercase tracking-wider mb-2">Instructor</p>
              <p className="font-display font-semibold text-white">{certificate.instructor_name}</p>
              <p className="text-sky-400 text-sm">{certificate.instructor_title}</p>
              <p className="text-brand-400 text-sm">{certificate.instructor_credentials}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div
          className="glass-dark rounded-2xl p-6 border border-white/10 text-center animate-slide-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="font-display text-lg font-semibold text-white mb-4">Código QR de Verificación</h2>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-xl">
              <QRCodeDisplay verificationCode={certificate.verification_code} size={150} />
            </div>
          </div>
          <p className="text-brand-400 text-sm">
            Este código QR permite verificar la autenticidad de este certificado.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
          <p className="text-brand-400 text-sm">
            &copy; {new Date().getFullYear()} Force Perú S.A.C. - Centro de Formación y Especialización
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm mt-3 transition-colors"
          >
            <Icon name="arrow_back" size="xs" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
