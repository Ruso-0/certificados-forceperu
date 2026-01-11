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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 to-brand/70" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-in-left">
              Limpieza de Ambientes
            </h1>
            <p className="text-xl text-white/90 max-w-xl animate-slide-in-left" style={{ animationDelay: '200ms' }}>
              Servicios profesionales de limpieza integral
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-brand hover:underline">Inicio</Link>
            <Icon name="chevron_right" size="xs" className="text-gray-400" />
            <Link to="/servicios" className="text-brand hover:underline">Servicios</Link>
            <Icon name="chevron_right" size="xs" className="text-gray-400" />
            <span className="text-gray-600">Limpieza de Ambientes</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
                Espacios Impecables
              </h2>
              <div className="w-16 h-1 bg-brand mb-6" />

              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  En <strong>Force Perú SAC</strong> ofrecemos servicios profesionales de limpieza
                  integral para todo tipo de espacios: oficinas, industrias, comercios, edificios
                  y áreas residenciales.
                </p>
                <p className="mb-4">
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
                <h3 className="text-lg font-bold text-brand-navy mb-4">Nuestros Servicios:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size="xs" className="text-brand" />
                      </div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video / Image */}
            <div>
              <div className="bg-gray-100 rounded-xl overflow-hidden aspect-video mb-6">
                <div className="w-full h-full flex items-center justify-center bg-brand-navy/10">
                  <div className="text-center">
                    <Icon name="play_circle" size="xl" className="text-brand mb-2" />
                    <p className="text-gray-500 text-sm">Video del servicio</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-brand rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">¿Necesitas este servicio?</h3>
                <p className="text-white/80 mb-4">
                  Solicita una cotización gratuita y sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contacto"
                    className="px-6 py-2 bg-white text-brand font-semibold rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Cotizar
                  </Link>
                  <a
                    href="https://wa.me/51999925132?text=Hola,%20me%20interesa%20el%20servicio%20de%20limpieza%20de%20ambientes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
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
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
              ¿Por qué elegirnos?
            </h2>
            <div className="w-16 h-1 bg-brand mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-lg card-hover text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} size="lg" className="text-brand" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Otros servicios</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              to="/servicios/saneamiento-ambiental"
              className="p-4 bg-gray-50 rounded-lg hover:bg-brand/5 transition-colors flex items-center gap-3"
            >
              <Icon name="pest_control" className="text-brand" />
              <span className="font-medium text-brand-navy">Saneamiento Ambiental</span>
            </Link>
            <Link
              to="/servicios/seguridad-integral"
              className="p-4 bg-gray-50 rounded-lg hover:bg-brand/5 transition-colors flex items-center gap-3"
            >
              <Icon name="security" className="text-brand" />
              <span className="font-medium text-brand-navy">Seguridad Integral</span>
            </Link>
            <Link
              to="/servicios/capacitacion"
              className="p-4 bg-gray-50 rounded-lg hover:bg-brand/5 transition-colors flex items-center gap-3"
            >
              <Icon name="school" className="text-brand" />
              <span className="font-medium text-brand-navy">Capacitación</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
