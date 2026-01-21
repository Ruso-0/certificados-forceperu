import { useState } from 'react'
import { Link } from 'react-router-dom'

// ============================================
// CONFIGURACION - CAMBIAR AQUI
// ============================================
const CONFIG = {
  // WhatsApp
  WHATSAPP_NUMBER: '51907544736',

  // Imagenes (colocar en /public/)
  LOGO: '/images/logo-force.png',
}
// ============================================

const whatsappLink = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero informacion sobre el SEMINARIO VIP')}`

// Iconos SVG inline
const Icons = {
  whatsapp: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  calendar: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  video: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  checkCircle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  brain: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  badge: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  school: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  star: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
}

interface FormData {
  nombres: string
  apellidos: string
  dni: string
  telefono: string
  email: string
}

export function SeminarioVipPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir mensaje de WhatsApp con los datos del formulario
    const message = `*INSCRIPCION SEMINARIO VIP*
*Proteccion de Personajes Importantes*

*Nombres:* ${formData.nombres}
*Apellidos:* ${formData.apellidos}
*DNI:* ${formData.dni}
*Telefono:* ${formData.telefono}
*Email:* ${formData.email}

Solicito mi inscripcion al seminario.`

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const faqs = [
    {
      question: '¿El seminario es gratis?',
      answer: 'Si, el acceso al seminario de 3 dias es completamente GRATUITO. Podras participar en todas las sesiones en vivo sin costo alguno.'
    },
    {
      question: '¿La certificacion cuesta?',
      answer: 'La certificacion es OPCIONAL y tiene un costo de S/120. Solo pagas si deseas obtener la constancia oficial.'
    },
    {
      question: '¿Que incluye la certificacion?',
      answer: 'La certificacion incluye: evaluacion de conocimientos + emision de constancia oficial de Force Peru S.A.C. con validez para tu CV profesional.'
    },
    {
      question: '¿Como me inscribo?',
      answer: 'Puedes inscribirte escaneando el codigo QR, haciendo clic en el boton "Inscribete ahora" o escribiendonos directamente por WhatsApp.'
    },
    {
      question: '¿Es online en vivo?',
      answer: 'Si, el seminario es 100% online en vivo. Recibiras el link de acceso antes de cada sesion para conectarte desde cualquier dispositivo.'
    }
  ]

  const beneficios = [
    { icon: Icons.checkCircle, text: 'Acceso GRATUITO al seminario' },
    { icon: Icons.brain, text: 'Enfoque practico con casos y simulaciones' },
    { icon: Icons.shield, text: 'Protocolos y planificacion VIP' },
    { icon: Icons.badge, text: 'Certificacion opcional S/120' },
    { icon: Icons.clipboard, text: 'Incluye evaluacion + constancia' },
    { icon: Icons.users, text: 'Cupos limitados' },
  ]

  const incluye = [
    '3 dias de formacion intensiva',
    'Material digital (guia + plantillas)',
    'Casos practicos y simulaciones',
    'Acceso al grupo informativo (opcional)',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061526] via-[#081a2f] to-[#061526] text-white">
      {/* HUD Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #00e5ff 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #00e5ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Diagonal Lines Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            #00e5ff 35px,
            #00e5ff 36px
          )`
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-[#061526]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={CONFIG.LOGO} alt="Force Peru" className="h-10 sm:h-12" />
            <span className="text-white font-bold text-lg hidden sm:block tracking-wider">FORCE PERU S.A.C.</span>
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-sm transition-colors"
            aria-label="Contactar por WhatsApp"
          >
            {Icons.whatsapp}
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo centered */}
            <div className="flex justify-center mb-6">
              <img src={CONFIG.LOGO} alt="Force Peru" className="h-16 sm:h-20" />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="text-cyan-400">SEMINARIO VIP</span>
              <span className="block text-white">(3 DIAS)</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/90 mb-4 tracking-wide">
              PROTECCION DE PERSONAJES IMPORTANTES (VIP)
            </h2>

            <p className="text-lg sm:text-xl text-cyan-300/80 mb-8">
              Entrenamiento preventivo y protocolos operativos
              <span className="block text-white/70 text-base mt-1">(Online en vivo)</span>
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 rounded-full font-bold text-lg shadow-lg shadow-green-500/30 border border-green-400/30">
                SEMINARIO GRATIS
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 border border-cyan-400/30">
                Certificacion opcional S/120
              </div>
            </div>

            {/* Instructor */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl mb-10">
              <div className="text-cyan-400">{Icons.school}</div>
              <div className="text-left">
                <p className="text-white/60 text-sm">Instructor</p>
                <p className="text-white font-semibold">RODOLFO ARTURO PACHECO VERA</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#inscripcion"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
                aria-label="Inscribirse al seminario"
              >
                INSCRIBETE AHORA
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border border-cyan-500/30 hover:bg-white/20 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2"
                aria-label="Hablar por WhatsApp"
              >
                {Icons.whatsapp}
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="relative z-10 py-12 bg-black/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Fecha */}
            <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 flex justify-center mb-3">{Icons.calendar}</div>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Fecha</p>
              <p className="text-white font-bold text-xl">22 ENERO 2026</p>
            </div>

            {/* Horario */}
            <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 flex justify-center mb-3">{Icons.clock}</div>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Horario</p>
              <p className="text-white font-bold text-xl">19:30 - 21:30</p>
            </div>

            {/* Modalidad */}
            <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 flex justify-center mb-3">{Icons.video}</div>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Modalidad</p>
              <p className="text-white font-bold text-xl">ONLINE EN VIVO</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-cyan-400">BENEFICIOS</span> DEL SEMINARIO
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-cyan-400 flex-shrink-0">{item.icon}</div>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LO QUE INCLUYE */}
      <section className="relative z-10 py-16 sm:py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-cyan-400">LO QUE</span> INCLUYE
          </h2>

          <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-8">
            <ul className="space-y-4">
              {incluye.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="text-green-400 flex-shrink-0 mt-0.5">{Icons.checkCircle}</div>
                  <span className="text-white/90 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA intermedio */}
          <div className="text-center mt-10">
            <a
              href="#inscripcion"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30"
            >
              RESERVA TU CUPO GRATIS
            </a>
          </div>
        </div>
      </section>

      {/* CERTIFICACION */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-cyan-400">CERTIFICACION</span> OPCIONAL
          </h2>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-8 text-center">
            <div className="text-amber-400 flex justify-center mb-4">{Icons.star}</div>

            <p className="text-xl text-white mb-4">
              El seminario es <span className="text-green-400 font-bold">100% GRATUITO</span>
            </p>

            <p className="text-lg text-white/80 mb-6">
              La certificacion es <span className="text-amber-400 font-bold">OPCIONAL</span> y tiene un costo de <span className="text-amber-400 font-bold">S/120</span>
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white/70">
              <div className="text-amber-400">{Icons.info}</div>
              La certificacion incluye evaluacion + emision de constancia oficial
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE INSCRIPCION */}
      <section id="inscripcion" className="relative z-10 py-16 sm:py-20 bg-black/20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            <span className="text-cyan-400">FORMULARIO DE</span> INSCRIPCION
          </h2>
          <p className="text-white/60 text-center mb-10">Completa tus datos y te contactaremos por WhatsApp</p>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Nombres */}
              <div>
                <label htmlFor="nombres" className="block text-white/80 text-sm font-medium mb-2">
                  Nombres *
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  required
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="Ingresa tus nombres"
                />
              </div>

              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-white/80 text-sm font-medium mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  required
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="Ingresa tus apellidos"
                />
              </div>

              {/* DNI */}
              <div>
                <label htmlFor="dni" className="block text-white/80 text-sm font-medium mb-2">
                  DNI *
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  required
                  maxLength={8}
                  pattern="[0-9]{8}"
                  value={formData.dni}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="12345678"
                />
              </div>

              {/* Telefono */}
              <div>
                <label htmlFor="telefono" className="block text-white/80 text-sm font-medium mb-2">
                  Telefono / Celular *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="987654321"
                />
              </div>

              {/* Email - Full width */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                  Correo Electronico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            {/* Nota */}
            <p className="text-white/50 text-sm mt-6 mb-6">
              Al enviar este formulario, se abrira WhatsApp con tus datos para completar tu inscripcion.
            </p>

            {/* Boton Enviar */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl flex items-center justify-center gap-3"
            >
              {Icons.whatsapp}
              ENVIAR INSCRIPCION
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-cyan-400">PREGUNTAS</span> FRECUENTES
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-cyan-500/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  aria-expanded={faqOpen === index}
                >
                  <span className="text-white font-semibold pr-4">{faq.question}</span>
                  <div className={`text-cyan-400 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}>
                    {Icons.chevronDown}
                  </div>
                </button>
                {faqOpen === index && (
                  <div className="px-6 pb-4">
                    <p className="text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-cyan-500/20 bg-[#061526]/80 backdrop-blur-sm py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={CONFIG.LOGO} alt="Force Peru" className="h-12" />
          </div>

          <p className="text-white font-bold text-lg mb-2">FORCE PERU S.A.C.</p>

          <div className="flex flex-wrap justify-center gap-6 text-white/70 mb-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              {Icons.whatsapp}
              +51 907 544 736
            </a>
            <a
              href="https://force-peru.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              {Icons.globe}
              force-peru.vercel.app
            </a>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-semibold text-sm">
            {Icons.warning}
            CUPOS LIMITADOS
          </div>

          <p className="text-white/40 text-sm mt-6">
            Force Peru S.A.C. - Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Mobile) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all md:hidden"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
