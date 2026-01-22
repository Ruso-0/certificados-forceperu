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
      {/* Hero Section - Full Image */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-principal.png"
            alt="Force Perú - Seguridad Integral"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/30 via-transparent to-[#0B1220]/70" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-slide-up" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen" />
      </section>

      {/* Certifications Bar - Marquee Infinito */}
      <section className="bg-white border-b border-border py-6 lg:py-8 overflow-hidden">
        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track - Hacia la derecha */}
          <div className="flex animate-marquee-right">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-24 lg:gap-32 px-12 shrink-0">
                <a
                  href="https://www.sucamec.gob.pe/sel/faces/pub/VerificadorWeb.xhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                >
                  <img
                    src="/images/logos/Logo-SUCAMEC.png"
                    alt="SUCAMEC"
                    className="h-20 lg:h-24 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.digesa.minsa.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                >
                  <img
                    src="/images/logos/Logo-DIGESA.png"
                    alt="DIGESA"
                    className="h-36 lg:h-40 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://portal.indeci.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                >
                  <img
                    src="/images/Logo_INDECI.png"
                    alt="INDECI"
                    className="h-20 lg:h-24 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://www.iso.org/es/home/standards/committee-for-conformity-assessm/casco-1.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                >
                  <img
                    src="/images/logos/Logo-ISO.gif"
                    alt="ISO 9001"
                    className="h-20 lg:h-24 w-auto object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Prosegur Style */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-4">
              Nuestras áreas de negocio
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Ofrecemos soluciones completas adaptadas a las necesidades de cada cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.href}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm service-card reveal reveal-delay-${index + 1}`}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {service.iconImage ? (
                        <img src={service.iconImage} alt="" className="w-8 h-8 object-contain" />
                      ) : (
                        <Icon name={service.icon} size="lg" className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:translate-x-1 transition-all duration-300">
                      <Icon name="arrow_forward" size="sm" className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 reveal-left">
              <div className="space-y-4">
                <div className="img-zoom rounded-xl overflow-hidden">
                  <img
                    src="/images/cliente-1.jpg"
                    alt="Force Perú"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="img-zoom rounded-xl overflow-hidden">
                  <img
                    src="/images/cliente-2.jpg"
                    alt="Force Perú"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="img-zoom rounded-xl overflow-hidden">
                  <img
                    src="/images/cliente-3.jpg"
                    alt="Force Perú"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="img-zoom rounded-xl overflow-hidden">
                  <img
                    src="/images/cliente-4.jpg"
                    alt="Force Perú"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="reveal-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
                <Icon name="info" size="sm" />
                Sobre Nosotros
              </div>

              <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-6">
                Somos <span className="text-gradient-animate">Force Perú</span>
              </h2>

              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Desde 2012, nos dedicamos a proteger lo que más importa para nuestros clientes.
                Somos una empresa peruana comprometida con la excelencia en servicios de
                seguridad integral y saneamiento ambiental.
              </p>

              <p className="text-text-muted leading-relaxed mb-8">
                Contamos con un equipo de profesionales altamente capacitados y certificados,
                utilizando tecnología de punta y productos de primera calidad para garantizar
                resultados óptimos en cada servicio.
              </p>

              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors btn-shine"
              >
                Conoce más sobre nosotros
                <Icon name="arrow_forward" size="sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6 reveal">
            ¿Listo para proteger lo que más importa?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto reveal reveal-delay-1">
            Contáctanos hoy y recibe una cotización gratuita. Nuestro equipo está listo para asesorarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-2">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors btn-shine"
            >
              <Icon name="mail" size="sm" />
              Solicitar cotización
            </Link>
            <a
              href="https://wa.me/51907544736"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-success text-white font-semibold rounded-lg hover:bg-success-light transition-colors btn-shine"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 reveal reveal-delay-3">
            <a href="tel:+51907544736" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors icon-bounce">
              <Icon name="phone" size="sm" className="text-secondary" />
              907 544 736
            </a>
            <span className="flex items-center gap-2 text-white/70">
              <Icon name="schedule" size="sm" className="text-secondary" />
              Lun - Sáb: 9:00 AM - 7:00 PM
            </span>
          </div>
        </div>
      </section>

      {/* Verification CTA */}
      <section className="py-12 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 reveal">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center icon-bounce">
                <Icon name="qr_code_scanner" size="lg" className="text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text text-lg">¿Tienes un certificado de Force Perú?</h3>
                <p className="text-text-muted">Verifica su autenticidad ingresando el código de verificación</p>
              </div>
            </div>
            <Link
              to="/verificar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-colors btn-shine"
            >
              <Icon name="verified" size="sm" />
              Verificar Certificado
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
