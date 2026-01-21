import { useState } from 'react'
import { Link } from 'react-router-dom'

// ============================================
// CONFIGURACION - CAMBIAR AQUI
// ============================================
const CONFIG = {
  // Link de registro (Google Forms, Eventbrite, etc.)
  REG_LINK: 'https://forms.google.com/tu-formulario-aqui',

  // WhatsApp
  WHATSAPP_NUMBER: '51907544736',
  WHATSAPP_MESSAGE: 'Hola, quiero inscribirme al SEMINARIO VIP de Proteccion de Personajes Importantes',

  // Imagenes (colocar en /public/)
  LOGO: '/images/logo-force.png',
  QR_IMAGE: '/images/qr-seminario-vip.png',
}
// ============================================

const whatsappLink = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`

export function SeminarioVipPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

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
    { icon: 'check_circle', text: 'Acceso GRATUITO al seminario' },
    { icon: 'psychology', text: 'Enfoque practico con casos y simulaciones' },
    { icon: 'security', text: 'Protocolos y planificacion VIP' },
    { icon: 'workspace_premium', text: 'Certificacion opcional S/120' },
    { icon: 'assignment_turned_in', text: 'Incluye evaluacion + constancia' },
    { icon: 'groups', text: 'Cupos limitados' },
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
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
              <span className="material-symbols-outlined text-cyan-400 text-2xl">school</span>
              <div className="text-left">
                <p className="text-white/60 text-sm">Instructor</p>
                <p className="text-white font-semibold">RODOLFO ARTURO PACHECO VERA</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONFIG.REG_LINK}
                target="_blank"
                rel="noopener noreferrer"
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
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border border-cyan-500/30 hover:bg-white/20 hover:border-cyan-400/50 transition-all"
                aria-label="Hablar por WhatsApp"
              >
                <svg className="w-6 h-6 inline-block mr-2 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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
              <span className="material-symbols-outlined text-cyan-400 text-4xl mb-3 block">calendar_month</span>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Fecha</p>
              <p className="text-white font-bold text-xl">22 ENERO 2026</p>
            </div>

            {/* Horario */}
            <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
              <span className="material-symbols-outlined text-cyan-400 text-4xl mb-3 block">schedule</span>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Horario</p>
              <p className="text-white font-bold text-xl">19:30 - 21:30</p>
            </div>

            {/* Modalidad */}
            <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-colors">
              <span className="material-symbols-outlined text-cyan-400 text-4xl mb-3 block">videocam</span>
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
                <span className="material-symbols-outlined text-cyan-400 text-2xl flex-shrink-0">{item.icon}</span>
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
                  <span className="material-symbols-outlined text-green-400 text-xl flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-white/90 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA intermedio */}
          <div className="text-center mt-10">
            <a
              href={CONFIG.REG_LINK}
              target="_blank"
              rel="noopener noreferrer"
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
            <span className="material-symbols-outlined text-amber-400 text-5xl mb-4 block">workspace_premium</span>

            <p className="text-xl text-white mb-4">
              El seminario es <span className="text-green-400 font-bold">100% GRATUITO</span>
            </p>

            <p className="text-lg text-white/80 mb-6">
              La certificacion es <span className="text-amber-400 font-bold">OPCIONAL</span> y tiene un costo de <span className="text-amber-400 font-bold">S/120</span>
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white/70">
              <span className="material-symbols-outlined text-amber-400">info</span>
              La certificacion incluye evaluacion + emision de constancia oficial
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRO / QR */}
      <section className="relative z-10 py-16 sm:py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <span className="text-cyan-400">REGISTRATE</span> AHORA
          </h2>

          <div className="bg-gradient-to-br from-[#0a1f35] to-[#081a2f] border border-cyan-500/20 rounded-2xl p-8 text-center">
            {/* QR Code */}
            <div className="mb-6">
              <div className="inline-block p-4 bg-white rounded-xl">
                <img
                  src={CONFIG.QR_IMAGE}
                  alt="Codigo QR para registro"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <p className="text-white/60 mt-3">Escanea el QR para inscribirte</p>
            </div>

            {/* Link de respaldo */}
            <div className="mb-6">
              <p className="text-white/60 text-sm mb-2">O usa este enlace:</p>
              <a
                href={CONFIG.REG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline break-all"
              >
                {CONFIG.REG_LINK}
              </a>
            </div>

            {/* Boton principal */}
            <a
              href={CONFIG.REG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#061526] font-bold text-xl rounded-xl hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl"
            >
              REGISTRARME
            </a>
          </div>
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
                  <span className={`material-symbols-outlined text-cyan-400 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +51 907 544 736
            </a>
            <a
              href="https://force-peru.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">language</span>
              force-peru.vercel.app
            </a>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-semibold text-sm">
            <span className="material-symbols-outlined text-lg">warning</span>
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
