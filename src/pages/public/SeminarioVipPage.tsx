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

        {/* ============================================
            PRICING SECTION - Two Tier Emphasized Right
            ============================================ */}
        <section className="mb-10 py-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-cyan-400/80 text-xs font-medium tracking-[0.2em] uppercase mb-2">Elige tu experiencia</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              ¿Qué incluye tu inscripción?
            </h2>
          </div>

          {/* Pricing Cards Container */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch justify-center max-w-4xl mx-auto">

            {/* ========== CARD 1: SEMINARIO GRATUITO ========== */}
            <div className="group relative flex-1 lg:max-w-[340px]">
              {/* Card */}
              <div className="relative h-full bg-[#0a1c2e]/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">Seminario</h3>
                    <span className="px-2.5 py-1 bg-cyan-500/15 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                      Gratis
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">S/ 0</span>
                    <span className="text-slate-500 text-sm">/evento</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">Formación intensiva de 3 días</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">Casos reales y simulaciones tácticas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">Material digital de apoyo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">Acceso en vivo online</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-500 text-sm">Sin certificado oficial</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById('form-inscripcion')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 active:scale-[0.98]"
                >
                  Inscribirme Gratis
                </button>

                {/* Social Proof */}
                {!statsLoading && stats && stats.free_count > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p className="text-center text-[11px] text-slate-500">
                      <span className="text-cyan-400/70">{stats.free_count}</span> participantes inscritos
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ========== CARD 2: CERTIFICACIÓN PRO (EMPHASIZED) ========== */}
            <div className="group relative flex-1 lg:max-w-[380px] lg:scale-[1.02]">

              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-[#0d2136] via-[#0f2740] to-[#0d2136] border border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/20 overflow-hidden">

                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                {/* Badge: Más Elegido */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#061526] text-[10px] font-bold uppercase tracking-wider rounded-b-lg shadow-lg shadow-amber-500/30">
                    Más Elegido
                  </div>
                </div>

                {/* Header */}
                <div className="mb-6 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-white">Certificación Profesional</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">S/ 120</span>
                    <span className="text-slate-500 text-sm">/único pago</span>
                  </div>
                  <p className="text-amber-400/70 text-xs mt-2">Incluye todo el seminario + certificación</p>
                </div>

                {/* Value Strip */}
                <div className="mb-5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-400/90 text-xs font-medium">Evaluación + Certificado digital verificable</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm">Todo lo del seminario gratuito</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm">Evaluación de competencias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm">Certificado digital con QR verificable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200 text-sm">Validez laboral institucional</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const message = `Hola, deseo la *CERTIFICACIÓN PROFESIONAL* (S/120) del Seminario VIP de Protección de Personajes.`
                    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#061526] font-bold rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/40 active:scale-[0.98]"
                >
                  Obtener Certificación
                </button>

                {/* Social Proof */}
                {!statsLoading && stats && stats.cert_count > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-500/20">
                    <p className="text-center text-[11px] text-slate-500">
                      <span className="text-amber-400/70">{stats.cert_count}</span> participantes certificados
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Note */}
          <p className="text-center text-slate-500 text-xs mt-6 max-w-md mx-auto">
            Puedes inscribirte gratis ahora y agregar la certificación después si lo deseas.
          </p>
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
