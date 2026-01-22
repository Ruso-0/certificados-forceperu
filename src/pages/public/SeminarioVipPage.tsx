import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONFIG = {
  WHATSAPP_NUMBER: '51907544736',
  LOGO: '/images/logo-force.png',
  FLYER: '/images/flyer-seminario-vip.png',
  PAGE_URL: 'https://force-peru.vercel.app/seminario-vip',
}

// Fecha del seminario: 22 de enero 2026, 19:30
const SEMINARIO_DATE = new Date('2026-01-22T19:30:00')

interface FormData {
  nombres: string
  telefono: string
  email: string
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

  // QR Code usando API gratuita
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(CONFIG.PAGE_URL)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061526] via-[#0a1f35] to-[#061526] text-white">
      {/* Header simple */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-cyan-500/10">
        <Link to="/" className="flex items-center gap-2">
          <img src={CONFIG.LOGO} alt="Force Peru" className="h-8" />
          <span className="text-white font-bold text-sm hidden sm:block">FORCE PERU</span>
        </Link>
        <a
          href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Flyer Image */}
        <section className="mb-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/20">
            <img
              src={CONFIG.FLYER}
              alt="Seminario VIP - Proteccion de Personajes Importantes"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Countdown */}
        <section className="mb-6">
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
        <section className="mb-6">
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

        {/* QR Code */}
        <section className="mb-6">
          <div className="bg-white/5 border border-cyan-500/20 rounded-2xl p-5 text-center">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Escanea y comparte</p>
            <div className="inline-block p-3 bg-white rounded-xl mb-3">
              <img
                src={qrUrl}
                alt="QR Code - Seminario VIP"
                className="w-32 h-32"
              />
            </div>
            <p className="text-cyan-400/80 text-xs break-all">{CONFIG.PAGE_URL}</p>

            {/* Boton descargar QR */}
            <a
              href={qrUrl}
              download="qr-seminario-vip.png"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:bg-cyan-500/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar QR
            </a>
          </div>
        </section>

        {/* Certificacion - nota pequeña */}
        <section className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-amber-400 font-semibold text-sm">Certificacion opcional</p>
              <p className="text-white/60 text-xs">S/120 - Incluye evaluacion + constancia</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs">Force Peru S.A.C.</p>
          <p className="text-cyan-400/60 text-xs">+51 907 544 736</p>
        </footer>
      </main>
    </div>
  )
}
