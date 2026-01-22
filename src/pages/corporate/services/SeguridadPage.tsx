import { Link } from 'react-router-dom'
import { Icon } from '../../../components/ui/Icon'

const features = [
  'Vigilancia privada 24/7',
  'Resguardo y protección personal',
  'Seguridad patrimonial',
  'Seguridad corporativa',
  'Control de accesos',
  'Planes de seguridad',
  'Seguridad en eventos',
  'Protección ejecutiva',
]

const benefits = [
  {
    icon: 'verified_user',
    title: 'Personal Certificado',
    description: 'Agentes con licencia SUCAMEC y capacitación continua en técnicas de seguridad.',
  },
  {
    icon: 'schedule',
    title: 'Disponibilidad 24/7',
    description: 'Servicio de vigilancia las 24 horas del día, los 365 días del año.',
  },
  {
    icon: 'devices',
    title: 'Tecnología Avanzada',
    description: 'Equipamiento moderno: radios, cámaras, sistemas de control de acceso.',
  },
  {
    icon: 'assessment',
    title: 'Supervisión Constante',
    description: 'Monitoreo y supervisión permanente para garantizar la calidad del servicio.',
  },
]

export function SeguridadPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="/images/servicios/seguridad/seguridad-3.jpg"
            alt="Seguridad Integral"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 55%' }}
          />
        </div>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/40" />

        {/* Efecto de líneas animadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-right" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-left" />
        </div>

        {/* Contenido */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <img src="/images/icons/seguridad-icon.png" alt="" className="w-6 h-6 object-contain" />
                Servicio Profesional
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-4 leading-tight">
                Seguridad Integral
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-xl mb-8">
                Protección profesional para empresas y personas
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contacto"
                  className="px-8 py-3.5 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-light transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Solicitar Cotización
                </Link>
                <a
                  href="https://wa.me/51907544736?text=Hola,%20me%20interesa%20el%20servicio%20de%20seguridad%20integral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-success text-white font-semibold rounded-lg hover:bg-success-light transition-all flex items-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-bg py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-secondary hover:underline">Inicio</Link>
            <Icon name="chevron_right" size="xs" className="text-text-muted" />
            <Link to="/servicios" className="text-secondary hover:underline">Servicios</Link>
            <Icon name="chevron_right" size="xs" className="text-text-muted" />
            <span className="text-text-muted">Seguridad Integral</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-primary text-2xl lg:text-3xl font-display font-bold mb-4">
                Protección Profesional
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />

              <div className="text-text-muted space-y-4">
                <p>
                  En <strong className="text-text">Force Perú SAC</strong> brindamos servicios de seguridad integral
                  a empresas públicas y privadas con un equipo humano altamente capacitado
                  y con experiencia comprobada en el sector.
                </p>
                <p>
                  Nuestro personal cuenta con licencia SUCAMEC vigente y recibe capacitación
                  continua en técnicas de seguridad, manejo de conflictos, primeros auxilios
                  y atención al cliente, garantizando un servicio profesional y de calidad.
                </p>
                <p>
                  Diseñamos planes de seguridad personalizados según las necesidades específicas
                  de cada cliente, implementando medidas preventivas y correctivas para minimizar
                  cualquier clase de amenaza existente.
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-text mb-4">Nuestros Servicios:</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size="xs" className="text-secondary" />
                      </div>
                      <span className="text-text-muted text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video / Image */}
            <div>
              <div className="bg-bg rounded-lg overflow-hidden aspect-video mb-6 border border-border">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/seguridad-servicio.mp4" type="video/mp4" />
                </video>
              </div>

              {/* CTA Card */}
              <div className="bg-primary rounded-lg p-6 text-white">
                <h3 className="text-xl font-display font-bold mb-2">¿Necesitas este servicio?</h3>
                <p className="text-white/80 mb-4">
                  Solicita una cotización gratuita y sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contacto"
                    className="px-6 py-2.5 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors text-center"
                  >
                    Cotizar
                  </Link>
                  <a
                    href="https://wa.me/51907544736?text=Hola,%20me%20interesa%20el%20servicio%20de%20seguridad%20integral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-success text-white font-medium rounded-md hover:bg-success-light transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Icon name="chat" size="sm" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-primary text-2xl lg:text-3xl font-display font-bold mb-4">
              ¿Por qué elegirnos?
            </h2>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-surface rounded-lg p-6 border border-border shadow-sm card-hover text-center"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} size="lg" className="text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-text mb-2">{benefit.title}</h3>
                <p className="text-text-muted text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-display font-semibold text-text mb-6">Otros servicios</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              to="/servicios/saneamiento-ambiental"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <img src="/images/icons/saneamiento-icon.png" alt="" className="w-7 h-7 object-contain" />
              <span className="font-medium text-text">Saneamiento Ambiental</span>
            </Link>
            <Link
              to="/servicios/capacitacion"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <img src="/images/icons/capacitacion-icon.png" alt="" className="w-7 h-7 object-contain" />
              <span className="font-medium text-text">Capacitación</span>
            </Link>
            <Link
              to="/servicios/limpieza"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <img src="/images/icons/limpieza-icon.png" alt="" className="w-7 h-7 object-contain" />
              <span className="font-medium text-text">Limpieza</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
