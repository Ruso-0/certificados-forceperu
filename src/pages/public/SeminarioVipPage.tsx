import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONFIG = {
  WHATSAPP_NUMBER: '51907544736',
  LOGO: '/images/logo-force.png',
  FLYER: '/images/flyer-seminario-vip.png',
  QR_CODE: '/images/qr-seminario-vip.svg',
  PAGE_URL: 'https://force-peru.vercel.app/seminario-vip',
}

// Fecha del seminario: 22 de enero 2026, 19:30
const SEMINARIO_DATE = new Date('2026-01-22T19:30:00')

interface FormData {
  nombres: string
  telefono: string
  email: string
}

interface StatsData {
  free_count: number
  cert_count: number
  updated_at: string
}

// Estadísticas base - incrementan visualmente cada 4 horas
const BASE_STATS = {
  free_count: 9,
  cert_count: 6,
  start_date: new Date('2026-01-21T00:00:00').getTime(),
}

function calculateDynamicStats(): StatsData {
  const now = Date.now()
  const hoursPassed = Math.floor((now - BASE_STATS.start_date) / (1000 * 60 * 60))
  const increments = Math.floor(hoursPassed / 4) // Incrementa cada 4 horas

  return {
    free_count: BASE_STATS.free_count + increments,
    cert_count: BASE_STATS.cert_count + Math.floor(increments * 0.6), // Crece más lento
    updated_at: new Date().toISOString(),
  }
}

function useInscripcionStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Usar stats dinámicos directamente
    setStats(calculateDynamicStats())
    setLoading(false)

    // Actualizar cada 4 horas
    const interval = setInterval(() => {
      setStats(calculateDynamicStats())
    }, 4 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}

function formatLocalDate(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate.getTime() - new Date().getTime()
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

export function SeminarioVipPage() {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    telefono: '',
    email: '',
  })
  const countdown = useCountdown(SEMINARIO_DATE)
  const { stats, loading: statsLoading } = useInscripcionStats()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `*INSCRIPCION SEMINARIO VIP*
Proteccion VIP - 3 Dias

*Nombre:* ${formData.nombres}
*Telefono:* ${formData.telefono}
*Email:* ${formData.email}`

    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061526] via-[#0a1f35] to-[#061526] text-white">
      {/* Header simple */}
      <header className="px-4 py-3 flex items-center justify-center border-b border-cyan-500/10">
        <Link to="/" className="flex items-center gap-2">
          <img src={CONFIG.LOGO} alt="Force Peru" className="h-8" />
          <span className="text-white font-bold text-sm">Force Peru S. A. C.</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* Flyer Image */}
        <section className="mb-8 max-w-lg mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/20">
            <img
              src={CONFIG.FLYER}
              alt="Seminario VIP - Proteccion de Personajes Importantes"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Seccion: Que incluye tu inscripcion */}
        <section className="mb-8">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-6">
            <span className="text-white">¿Qué incluye tu </span>
            <span className="text-cyan-400">inscripción</span>
            <span className="text-white">?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Card 1: Seminario GRATUITO */}
            <div className="group bg-[#0b2640] border border-cyan-500/20 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Seminario GRATUITO</h3>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-semibold uppercase">
                  Gratis
                </span>
              </div>

              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Formación intensiva (3 días) en prevención y protocolos operativos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Casos reales y simulaciones tácticas orientadas a escenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Material digital de apoyo durante el evento</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Acceso en vivo online</span>
                </li>
              </ul>

              <button
                onClick={() => document.getElementById('form-inscripcion')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Inscribirme Gratis
              </button>

              {/* Prueba Social - Card Gratis */}
              <div className="mt-4 pt-4 border-t border-cyan-500/10" aria-label="Estadísticas de participantes">
                {!statsLoading && stats && stats.free_count > 0 ? (
                  <>
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-xs">
                        Elegido por <span className="text-cyan-400 font-semibold">{stats.free_count}</span> participantes
                      </span>
                    </div>
                    {stats.updated_at && (
                      <p className="text-center text-[10px] text-slate-500 mt-1">
                        Actualizado: {formatLocalDate(stats.updated_at)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-center text-xs text-slate-500">
                    Cupos limitados. Registro en curso.
                  </p>
                )}
              </div>
            </div>

            {/* Card 2: Certificacion Profesional */}
            <div className="group bg-[#0b2640] border border-amber-500/20 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Certificación Profesional</h3>
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-semibold uppercase">
                  Opcional
                </span>
              </div>

              <p className="text-amber-400/90 text-sm mb-4 italic">
                "Convierte tu asistencia en un respaldo profesional verificable."
              </p>

              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Evaluación de competencias operativas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Certificado digital con código de verificación</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">Validez laboral mediante convenios institucionales</span>
                </li>
              </ul>

              <div className="flex items-center justify-between mb-4 p-3 bg-amber-500/10 rounded-xl">
                <span className="text-white/60 text-sm">Inversión única:</span>
                <span className="text-amber-400 font-bold text-lg">S/ 120.00</span>
              </div>

              <button
                onClick={() => {
                  const message = `Hola, deseo agregar la *CERTIFICACIÓN PROFESIONAL* (S/120) al Seminario VIP de Protección de Personajes.`
                  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-[#061526] font-bold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-amber-500/30"
              >
                Agregar Certificación
              </button>

              {/* Prueba Social - Card Certificación */}
              <div className="mt-4 pt-4 border-t border-amber-500/10" aria-label="Estadísticas de certificación">
                {!statsLoading && stats && stats.cert_count > 0 ? (
                  <>
                    {/* Chip Recomendado */}
                    <div className="flex justify-center mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] text-amber-400 font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Recomendado para CV
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-xs">
                        <span className="text-amber-400 font-semibold">{stats.cert_count}</span> participantes ya se certificaron
                      </span>
                    </div>
                    {stats.updated_at && (
                      <p className="text-center text-[10px] text-slate-500 mt-1">
                        Actualizado: {formatLocalDate(stats.updated_at)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-center text-xs text-slate-500">
                    Cupos limitados. Registro en curso.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="mb-6 max-w-lg mx-auto">
          <p className="text-center text-white/60 text-xs uppercase tracking-wider mb-3">Inicia en</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 text-center">
              <p className="text-cyan-400 text-2xl sm:text-3xl font-bold">{countdown.days}</p>
              <p className="text-white/50 text-[10px] uppercase">Dias</p>
            </div>
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 text-center">
              <p className="text-cyan-400 text-2xl sm:text-3xl font-bold">{countdown.hours.toString().padStart(2, '0')}</p>
              <p className="text-white/50 text-[10px] uppercase">Horas</p>
            </div>
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 text-center">
              <p className="text-cyan-400 text-2xl sm:text-3xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</p>
              <p className="text-white/50 text-[10px] uppercase">Min</p>
            </div>
            <div className="bg-white/5 border border-cyan-500/20 rounded-xl p-3 text-center">
              <p className="text-cyan-400 text-2xl sm:text-3xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</p>
              <p className="text-white/50 text-[10px] uppercase">Seg</p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section id="form-inscripcion" className="mb-6 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-center mb-4">
              <span className="text-cyan-400">Inscribete</span> Gratis
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                name="nombres"
                required
                value={formData.nombres}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="Nombre completo"
              />
              <input
                type="tel"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="Telefono / WhatsApp"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 text-sm"
                placeholder="Correo electronico"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 active:scale-[0.98] transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              INSCRIBIRME
            </button>
          </form>
        </section>

        {/* Compartir */}
        <section className="mb-6 max-w-lg mx-auto">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Seminario VIP - Proteccion de Personajes',
                  text: 'Inscribete gratis al seminario de 3 dias',
                  url: CONFIG.PAGE_URL,
                })
              } else {
                navigator.clipboard.writeText(CONFIG.PAGE_URL)
                alert('Link copiado!')
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-cyan-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-white font-medium">Compartir evento</span>
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 border-t border-white/10 max-w-lg mx-auto">
          <p className="text-white/40 text-xs">Force Peru S.A.C.</p>
          <p className="text-cyan-400/60 text-xs">+51 907 544 736</p>
        </footer>
      </main>
    </div>
  )
}
