import { Link } from 'react-router-dom'
import { Icon } from '../../../components/ui/Icon'

const features = [
  'Limpieza de oficinas y edificios',
  'Limpieza industrial',
  'Limpieza de centros comerciales',
  'Limpieza post-construcción',
  'Limpieza de vidrios y fachadas',
  'Tratamiento de pisos',
  'Mantenimiento de áreas comunes',
  'Limpieza profunda',
]

const benefits = [
  {
    icon: 'cleaning_services',
    title: 'Equipos Profesionales',
    description: 'Utilizamos equipos y maquinaria de última generación para resultados óptimos.',
  },
  {
    icon: 'eco',
    title: 'Productos Ecológicos',
    description: 'Productos de limpieza biodegradables que cuidan el medio ambiente.',
  },
  {
    icon: 'groups',
    title: 'Personal Capacitado',
    description: 'Equipo entrenado en técnicas de limpieza profesional y atención al cliente.',
  },
  {
    icon: 'event_available',
    title: 'Horarios Flexibles',
    description: 'Servicios adaptados a tu horario de trabajo sin interrumpir tus operaciones.',
  },
]

export function LimpiezaPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[400px] lg:h-[500px]">
        <img
          src="/images/service-limpieza.jpg"
          alt="Limpieza de Ambientes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Limpieza de Ambientes
            </h1>
            <p className="text-xl text-white/90 max-w-xl">
              Servicios profesionales de limpieza integral
            </p>
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
            <span className="text-text-muted">Limpieza de Ambientes</span>
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
                Espacios Impecables
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />

              <div className="text-text-muted space-y-4">
                <p>
                  En <strong className="text-text">Force Perú SAC</strong> ofrecemos servicios profesionales de limpieza
                  integral para todo tipo de espacios: oficinas, industrias, comercios, edificios
                  y áreas residenciales.
                </p>
                <p>
                  Nuestro equipo de profesionales utiliza equipos de última generación y productos
                  de limpieza ecológicos que garantizan resultados impecables sin dañar el medio
                  ambiente ni afectar la salud de las personas.
                </p>
                <p>
                  Diseñamos planes de limpieza personalizados según las necesidades de cada cliente,
                  con horarios flexibles que se adaptan a tu operación sin interrumpir tus actividades
                  diarias.
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-text mb-4">Nuestros Servicios:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="play_circle" size="xl" className="text-secondary mb-2" />
                    <p className="text-text-muted text-sm">Video del servicio</p>
                  </div>
                </div>
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
                    href="https://wa.me/51907544736?text=Hola,%20me%20interesa%20el%20servicio%20de%20limpieza%20de%20ambientes"
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
              to="/servicios/seguridad-integral"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <img src="/images/icons/seguridad-icon.png" alt="" className="w-7 h-7 object-contain" />
              <span className="font-medium text-text">Seguridad Integral</span>
            </Link>
            <Link
              to="/servicios/capacitacion"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <img src="/images/icons/capacitacion-icon.png" alt="" className="w-7 h-7 object-contain" />
              <span className="font-medium text-text">Capacitación</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
