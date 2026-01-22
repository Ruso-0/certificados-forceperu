import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const services = [
  {
    icon: 'pest_control',
    iconImage: '/images/icons/saneamiento-icon.png',
    title: 'Saneamiento Ambiental',
    description: 'Control de plagas, fumigación y desinfección con productos certificados.',
    href: '/servicios/saneamiento-ambiental',
    image: '/images/saneamiento-ambiental.jpg',
  },
  {
    icon: 'security',
    iconImage: '/images/icons/seguridad-icon.png',
    title: 'Seguridad Integral',
    description: 'Vigilancia privada, resguardo y protección patrimonial 24/7.',
    href: '/servicios/seguridad-integral',
    image: '/images/seguridad-integral.jpg',
  },
  {
    icon: 'school',
    iconImage: '/images/icons/capacitacion-icon.png',
    title: 'Capacitación',
    description: 'Cursos certificados en seguridad, primeros auxilios y emergencias.',
    href: '/servicios/capacitacion',
    image: '/images/capacitacion.jpg',
  },
  {
    icon: 'cleaning_services',
    iconImage: '/images/icons/limpieza-icon.png',
    title: 'Limpieza',
    description: 'Servicios profesionales de limpieza para oficinas e industrias.',
    href: '/servicios/limpieza',
    image: '/images/limpieza.jpg',
  },
]

export function HomePage() {
  useScrollReveal()

  return (
    <div>
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0B1220]">
        {/* Background Image - Desktop */}
        <div className="hidden md:block absolute inset-0">
          <img
            src="/images/hero-principal.jpg"
            alt="Force Perú - Seguridad Integral"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/60 to-transparent" />
        </div>

        {/* Background Image - Mobile (different crop) */}
        <div className="md:hidden absolute inset-0">
          <img
            src="/images/hero-principal.jpg"
            alt="Force Perú - Seguridad Integral"
            className="w-full h-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-[#0B1220]/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[100svh] flex items-end md:items-center pb-24 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Desde 2012 protegiendo lo que más importa
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Seguridad y
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Protección Integral
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                Soluciones profesionales en seguridad privada, saneamiento ambiental y capacitación. Tu tranquilidad es nuestra prioridad.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0B1220] font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
                >
                  Solicitar Cotización
                  <Icon name="arrow_forward" size="sm" />
                </Link>
                <a
                  href="https://wa.me/51907544736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Icon name="verified" size="sm" className="text-cyan-400" />
                    <span>Certificados SUCAMEC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="shield" size="sm" className="text-cyan-400" />
                    <span>+500 clientes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="schedule" size="sm" className="text-cyan-400" />
                    <span>Atención 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Bar - Clean & Premium */}
      <section className="bg-slate-50 py-8 lg:py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 font-medium uppercase tracking-wider mb-6">
            Certificaciones y Acreditaciones
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex animate-marquee-right">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 lg:gap-24 px-8 shrink-0">
                <a
                  href="https://www.sucamec.gob.pe/sel/faces/pub/VerificadorWeb.xhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/images/logos/Logo-SUCAMEC.png"
                    alt="SUCAMEC"
                    className="h-14 lg:h-16 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.digesa.minsa.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/images/logos/Logo-DIGESA.png"
                    alt="DIGESA"
                    className="h-24 lg:h-28 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://portal.indeci.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/images/Logo_INDECI.png"
                    alt="INDECI"
                    className="h-14 lg:h-16 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.iso.org/es/home/standards/committee-for-conformity-assessm/casco-1.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/images/logos/Logo-ISO.gif"
                    alt="ISO 9001"
                    className="h-14 lg:h-16 w-auto object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curso PMI - Video + Descripción */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Video */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20">
                <video
                  controls
                  playsInline
                  poster="/images/curso-pmi-poster.jpg"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/curso-pmi-promo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Descripción */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg shadow-amber-500/30">
                  <Icon name="event" size="xs" />
                  PRÓXIMAMENTE
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-600 text-xs font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Cupos limitados
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Curso PMI
              </h2>
              <p className="text-xl lg:text-2xl font-semibold text-amber-500 mb-4">
                Protección de Personajes Importantes
              </p>

              {/* Description */}
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Formación profesional de 60 horas en protección y seguridad personal. Aprende técnicas avanzadas de escoltas, evaluación de riesgos y protocolos de emergencia.
              </p>

              {/* Urgency Box */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="bolt" size="md" className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Los cupos se agotan rápido</p>
                    <p className="text-slate-400 text-sm">Reserva tu lugar antes de que sea tarde</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon name="check" size="sm" className="text-amber-600" />
                  </div>
                  <span className="text-slate-700">Certificación oficial con validez laboral</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon name="check" size="sm" className="text-amber-600" />
                  </div>
                  <span className="text-slate-700">Formación completa de 60 horas</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon name="check" size="sm" className="text-amber-600" />
                  </div>
                  <span className="text-slate-700">Instructores certificados SUCAMEC</span>
                </li>
              </ul>

              {/* CTA */}
              <a
                href="https://wa.me/51907544736?text=Hola,%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20PMI%20de%20Protección%20de%20Personajes%20Importantes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/40 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reservar mi Cupo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Stats Focus */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image with Stats overlay */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/cliente-1.jpg"
                  alt="Force Perú - Equipo profesional"
                  className="w-full h-80 lg:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/30 to-transparent" />

                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl lg:text-4xl font-bold text-white">12+</p>
                      <p className="text-white/70 text-sm">Años de experiencia</p>
                    </div>
                    <div className="text-center border-x border-white/20">
                      <p className="text-3xl lg:text-4xl font-bold text-white">500+</p>
                      <p className="text-white/70 text-sm">Clientes satisfechos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl lg:text-4xl font-bold text-white">24/7</p>
                      <p className="text-white/70 text-sm">Disponibilidad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 lg:-right-8 bg-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg">
                <p className="text-sm font-bold">Desde 2012</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm text-cyan-600 font-semibold uppercase tracking-wider mb-3">
                Sobre Nosotros
              </p>

              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Protegemos lo que más
                <span className="text-cyan-600"> importa para ti</span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Somos una empresa peruana comprometida con la excelencia en servicios de
                seguridad integral y saneamiento ambiental. Nuestro equipo está formado por
                profesionales certificados y con amplia experiencia.
              </p>

              {/* Features list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" size="sm" className="text-cyan-600" />
                  </div>
                  <p className="text-slate-700">Personal capacitado y certificado por SUCAMEC</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" size="sm" className="text-cyan-600" />
                  </div>
                  <p className="text-slate-700">Productos y equipos de primera calidad</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" size="sm" className="text-cyan-600" />
                  </div>
                  <p className="text-slate-700">Atención personalizada y respuesta inmediata</p>
                </div>
              </div>

              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1220] text-white font-semibold rounded-xl hover:bg-[#0B1220]/90 transition-colors"
              >
                Conocer más
                <Icon name="arrow_forward" size="sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Modern */}
      <section className="py-16 lg:py-24 bg-[#0B1220] relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Solicita una cotización gratuita y descubre cómo podemos ayudarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0B1220] font-semibold rounded-xl hover:bg-white/90 transition-all duration-300"
            >
              Solicitar Cotización
              <Icon name="arrow_forward" size="sm" />
            </Link>
            <a
              href="https://wa.me/51907544736"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
            <a href="tel:+51907544736" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <Icon name="phone" size="sm" className="text-cyan-400" />
              907 544 736
            </a>
            <span className="flex items-center gap-2 text-white/50">
              <Icon name="schedule" size="sm" className="text-cyan-400" />
              Lun - Sáb: 9:00 AM - 7:00 PM
            </span>
            <span className="flex items-center gap-2 text-white/50">
              <Icon name="location_on" size="sm" className="text-cyan-400" />
              Lima, Perú
            </span>
          </div>
        </div>
      </section>

      {/* Verification CTA - Minimal */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Icon name="qr_code_scanner" size="md" className="text-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Verificar Certificado</h3>
                <p className="text-slate-500 text-sm">Comprueba la autenticidad de tu certificado Force Perú</p>
              </div>
            </div>
            <Link
              to="/verificar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors text-sm"
            >
              <Icon name="verified" size="sm" />
              Verificar ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
