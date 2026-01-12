import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'

const services = [
  {
    icon: 'pest_control',
    title: 'Saneamiento Ambiental',
    description: 'Control de plagas, fumigación y desinfección con productos certificados.',
    href: '/servicios/saneamiento-ambiental',
    image: '/images/cliente-1.jpg',
  },
  {
    icon: 'security',
    title: 'Seguridad Integral',
    description: 'Vigilancia privada, resguardo y protección patrimonial 24/7.',
    href: '/servicios/seguridad-integral',
    image: '/images/cliente-2.jpg',
  },
  {
    icon: 'school',
    title: 'Capacitación',
    description: 'Cursos certificados en seguridad, primeros auxilios y emergencias.',
    href: '/servicios/capacitacion',
    image: '/images/cliente-3.jpg',
  },
  {
    icon: 'cleaning_services',
    title: 'Limpieza',
    description: 'Servicios profesionales de limpieza para oficinas e industrias.',
    href: '/servicios/limpieza',
    image: '/images/cliente-4.jpg',
  },
]

const stats = [
  { value: '+12', label: 'Años', sublabel: 'de experiencia' },
  { value: '+500', label: 'Clientes', sublabel: 'satisfechos' },
  { value: '+1000', label: 'Proyectos', sublabel: 'realizados' },
  { value: '24/7', label: 'Soporte', sublabel: 'disponible' },
]

const certifications = [
  { name: 'ISO 9001', icon: 'workspace_premium' },
  { name: 'DIGESA', icon: 'verified' },
  { name: 'SUCAMEC', icon: 'shield' },
  { name: 'INDECI', icon: 'local_fire_department' },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Section - Prosegur Style */}
      <section className="relative min-h-[85vh] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-secondary text-sm font-medium">Desde 2012 protegiendo tu tranquilidad</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                Soluciones integrales en{' '}
                <span className="text-secondary">seguridad</span> y{' '}
                <span className="text-secondary">saneamiento</span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-lg">
                Protegemos lo que más importa. Servicios profesionales con los más altos estándares de calidad para empresas y hogares.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/30"
                >
                  Nuestros servicios
                  <Icon name="arrow_forward" size="sm" />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Solicitar cotización
                </Link>
              </div>
            </div>

            {/* Right - Featured Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="/images/cliente-5.jpg"
                  alt="Force Perú en acción"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="verified" size="lg" className="text-success" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-text text-lg">Empresa Certificada</p>
                      <p className="text-text-muted text-sm">ISO 9001 | DIGESA | SUCAMEC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-8 lg:py-10 text-center ${
                  index < stats.length - 1 ? 'border-r border-border' : ''
                }`}
              >
                <div className="text-4xl lg:text-5xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-text font-semibold">{stat.label}</div>
                <div className="text-text-muted text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Prosegur Style */}
      <section className="py-20 lg:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-4">
              Nuestras áreas de negocio
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Ofrecemos soluciones completas adaptadas a las necesidades de cada cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
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
                    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name={service.icon} size="lg" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/cliente-1.jpg"
                  alt="Force Perú"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <img
                  src="/images/cliente-2.jpg"
                  alt="Force Perú"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="/images/cliente-3.jpg"
                  alt="Force Perú"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <img
                  src="/images/cliente-4.jpg"
                  alt="Force Perú"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
                <Icon name="info" size="sm" />
                Sobre Nosotros
              </div>

              <h2 className="text-3xl lg:text-4xl font-display font-bold text-text mb-6">
                Somos <span className="text-secondary">Force Perú</span>
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

              {/* Certifications */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {certifications.map((cert) => (
                  <div key={cert.name} className="text-center">
                    <div className="w-14 h-14 bg-bg rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon name={cert.icon} size="md" className="text-secondary" />
                    </div>
                    <span className="text-xs font-medium text-text-muted">{cert.name}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            ¿Listo para proteger lo que más importa?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Contáctanos hoy y recibe una cotización gratuita. Nuestro equipo está listo para asesorarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              <Icon name="mail" size="sm" />
              Solicitar cotización
            </Link>
            <a
              href="https://wa.me/51999925132"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-success text-white font-semibold rounded-lg hover:bg-success-light transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <a href="tel:+5117646953" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Icon name="phone" size="sm" className="text-secondary" />
              (01) 764 6953
            </a>
            <a href="tel:+51986536939" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Icon name="phone" size="sm" className="text-secondary" />
              986 536 939
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Icon name="qr_code_scanner" size="lg" className="text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text text-lg">¿Tienes un certificado de Force Perú?</h3>
                <p className="text-text-muted">Verifica su autenticidad ingresando el código de verificación</p>
              </div>
            </div>
            <Link
              to="/verificar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-colors"
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
