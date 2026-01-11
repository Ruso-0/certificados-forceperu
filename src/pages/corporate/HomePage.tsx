import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/corporate/HeroSlider'
import { ServiceCard } from '../../components/corporate/ServiceCard'
import { Icon } from '../../components/ui/Icon'

const services = [
  {
    title: 'Saneamiento Ambiental',
    description: 'Control de plagas, fumigación y desratización con métodos eco-amigables para proteger la salud de tu entorno.',
    image: '/images/service-saneamiento.jpg',
    href: '/servicios/saneamiento-ambiental',
  },
  {
    title: 'Seguridad Integral',
    description: 'Servicios de vigilancia y resguardo con personal altamente capacitado para empresas públicas y privadas.',
    image: '/images/service-seguridad.jpg',
    href: '/servicios/seguridad-integral',
  },
  {
    title: 'Capacitación y Entrenamiento',
    description: 'Programas de formación en seguridad, gestión de riesgos y protección patrimonial certificados.',
    image: '/images/service-capacitacion.jpg',
    href: '/servicios/capacitacion',
  },
  {
    title: 'Limpieza de Ambientes',
    description: 'Servicios profesionales de limpieza y mantenimiento para oficinas, industrias y espacios comerciales.',
    image: '/images/service-limpieza.jpg',
    href: '/servicios/limpieza',
  },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-reveal">
              <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
                FORCE PERÚ SAC
              </h2>
              <div className="w-16 h-1 bg-brand mb-6" />
              <p className="text-xl text-gray-600 italic mb-6">
                Trabajamos para tu tranquilidad.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Somos una empresa fundada en el año 2012, comprometida en el cuidado y
                protección de la salud e integridad de nuestros clientes. Ofrecemos servicios
                de Saneamiento Ambiental y Seguridad Integral con los más altos estándares de calidad.
              </p>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-md hover:bg-brand-dark transition-colors"
              >
                VER MÁS
                <Icon name="arrow_forward" size="sm" />
              </Link>
            </div>

            {/* Image */}
            <div className="animate-reveal-right">
              <img
                src="/images/edificio-force-peru.png"
                alt="Edificio Force Perú SAC"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 lg:py-20 bg-brand relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                CENTRAL TELEFÓNICA
              </h2>
              <div className="w-16 h-1 bg-white mb-6" />
              <p className="text-white/80 mb-8">
                Estamos aquí para asesorarlo de Lunes a Sábado de 9:00 a.m. a 7:00 p.m.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+5117646953"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-white/80 transition-colors"
                >
                  <Icon name="phone" size="lg" />
                  (01) 764 6953
                </a>
                <a
                  href="tel:+51986536939"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-white/80 transition-colors"
                >
                  <Icon name="phone" size="lg" />
                  986 536 939
                </a>
                <a
                  href="https://wa.me/51999925132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-white/80 transition-colors"
                >
                  <Icon name="chat" size="lg" />
                  999 925 132
                </a>
              </div>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand font-semibold rounded-md hover:bg-gray-100 transition-colors"
              >
                CONTÁCTENOS
              </Link>
            </div>

            {/* Image */}
            <div className="hidden lg:block">
              <img
                src="/images/recepcion.jpg"
                alt="Recepción Force Perú"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
              SERVICIOS
            </h2>
            <div className="w-16 h-1 bg-brand mx-auto" />
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={service.href}
                {...service}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Fourth service - full width or add more */}
          <div className="mt-8 max-w-md mx-auto sm:max-w-none sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="sm:col-start-2 lg:col-start-2">
              <ServiceCard
                {...services[3]}
                delay={300}
              />
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white font-semibold rounded-md hover:bg-brand-dark transition-colors"
            >
              VER TODOS LOS SERVICIOS
              <Icon name="arrow_forward" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-reveal">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">+12</div>
              <div className="text-brand-light text-sm uppercase tracking-wide">Años de Experiencia</div>
            </div>
            <div className="animate-reveal delay-100">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">+500</div>
              <div className="text-brand-light text-sm uppercase tracking-wide">Clientes Satisfechos</div>
            </div>
            <div className="animate-reveal delay-200">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">+1000</div>
              <div className="text-brand-light text-sm uppercase tracking-wide">Proyectos Realizados</div>
            </div>
            <div className="animate-reveal delay-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-brand-light text-sm uppercase tracking-wide">Soporte Disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
            ¿Necesitas nuestros servicios?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Contáctanos hoy y recibe una cotización gratuita. Estamos listos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="px-8 py-3 bg-brand text-white font-semibold rounded-md hover:bg-brand-dark transition-colors"
            >
              SOLICITAR COTIZACIÓN
            </Link>
            <a
              href="https://wa.me/51999925132"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              ESCRIBIR POR WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
