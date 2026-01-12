import { Link } from 'react-router-dom'
import { ServiceCard } from '../../components/corporate/ServiceCard'
import { Icon } from '../../components/ui/Icon'

const services = [
  {
    title: 'Saneamiento Ambiental',
    description: 'Brindamos servicios de control de plagas, fumigación, desratización, desinsectación y desinfección con productos eco-amigables de última generación que garantizan resultados efectivos sin dañar el medio ambiente.',
    image: '/images/saneamiento-ambiental.jpg',
    href: '/servicios/saneamiento-ambiental',
  },
  {
    title: 'Seguridad Integral',
    description: 'Ofrecemos servicios de vigilancia privada, resguardo personal, protección patrimonial y seguridad corporativa con personal altamente capacitado y equipamiento de última tecnología.',
    image: '/images/seguridad-integral.jpg',
    href: '/servicios/seguridad-integral',
  },
  {
    title: 'Capacitación y Entrenamiento',
    description: 'Programas de formación profesional en seguridad, gestión de riesgos de desastres, primeros auxilios, defensa personal y manejo de emergencias con certificación oficial.',
    image: '/images/capacitacion.jpg',
    href: '/servicios/capacitacion',
  },
  {
    title: 'Limpieza de Ambientes',
    description: 'Servicios profesionales de limpieza integral para oficinas, industrias, comercios y edificios. Utilizamos equipos y productos de alta calidad para garantizar espacios impecables.',
    image: '/images/limpieza.jpg',
    href: '/servicios/limpieza',
  },
]

export function ServicesPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] lg:h-[400px] bg-gray-400">
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-in-left">
              Nuestros Servicios
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-brand hover:underline">Inicio</Link>
            <Icon name="chevron_right" size="xs" className="text-gray-400" />
            <span className="text-gray-600">Servicios</span>
          </nav>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl lg:text-3xl font-bold mb-4">
              SERVICIOS
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales en seguridad y saneamiento ambiental
              con los más altos estándares de calidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.href}
                {...service}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl lg:text-3xl font-bold mb-4">
              ¿Por qué elegirnos?
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="verified" size="lg" className="text-white" />
              </div>
              <h3 className="font-bold text-primary mb-2">Experiencia</h3>
              <p className="text-gray-600 text-sm">Más de 12 años en el mercado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="groups" size="lg" className="text-white" />
              </div>
              <h3 className="font-bold text-primary mb-2">Personal Calificado</h3>
              <p className="text-gray-600 text-sm">Equipo altamente capacitado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="eco" size="lg" className="text-white" />
              </div>
              <h3 className="font-bold text-primary mb-2">Eco-Amigable</h3>
              <p className="text-gray-600 text-sm">Productos que cuidan el ambiente</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="support_agent" size="lg" className="text-white" />
              </div>
              <h3 className="font-bold text-primary mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 text-sm">Siempre disponibles para ti</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            ¿Necesitas una cotización?
          </h2>
          <p className="text-white/80 mb-8">
            Contáctanos y te brindaremos una propuesta personalizada según tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="px-8 py-3 bg-white text-secondary font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              SOLICITAR COTIZACIÓN
            </Link>
            <a
              href="https://wa.me/51907544736"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="chat" size="sm" />
              WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
