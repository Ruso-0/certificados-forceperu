import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/corporate/HeroSlider'
import { Icon } from '../../components/ui/Icon'

const services = [
  {
    icon: 'pest_control',
    title: 'Saneamiento Ambiental',
    description: 'Control de plagas y fumigacion profesional con productos certificados.',
    href: '/servicios/saneamiento-ambiental',
    color: 'sky',
  },
  {
    icon: 'security',
    title: 'Seguridad Integral',
    description: 'Vigilancia, resguardo y sistemas de seguridad para tu empresa.',
    href: '/servicios/seguridad-integral',
    color: 'accent',
  },
  {
    icon: 'school',
    title: 'Capacitacion',
    description: 'Cursos certificados en seguridad, primeros auxilios y emergencias.',
    href: '/servicios/capacitacion',
    color: 'success',
  },
  {
    icon: 'cleaning_services',
    title: 'Limpieza',
    description: 'Servicios profesionales de limpieza integral para todo tipo de espacios.',
    href: '/servicios/limpieza',
    color: 'brand',
  },
]

const stats = [
  { value: '+12', label: 'Anos de Experiencia', icon: 'calendar_month' },
  { value: '+500', label: 'Clientes Satisfechos', icon: 'groups' },
  { value: '+1000', label: 'Proyectos Realizados', icon: 'task_alt' },
  { value: '24/7', label: 'Soporte Disponible', icon: 'support_agent' },
]

const trustItems = [
  { icon: 'verified', text: 'Empresa Certificada' },
  { icon: 'workspace_premium', text: 'ISO 9001' },
  { icon: 'shield', text: 'Licencia SUCAMEC' },
  { icon: 'eco', text: 'Productos Eco-amigables' },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Trust Bar */}
      <section className="bg-brand-900 py-4 border-b border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-brand-300">
                <Icon name={item.icon} size="sm" className="text-sky-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
              <Icon name="auto_awesome" size="sm" />
              Nuestros Servicios
            </span>
            <h2 className="text-h2 text-brand-900 mb-4">
              Soluciones completas para tu empresa
            </h2>
            <p className="text-brand-600 max-w-2xl mx-auto text-lg">
              Ofrecemos servicios integrales de seguridad y saneamiento ambiental
              con los mas altos estandares de calidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.href}
                className="group bg-white rounded-2xl p-6 shadow-md card-hover animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  service.color === 'sky' ? 'bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white' :
                  service.color === 'accent' ? 'bg-accent-100 text-accent-600 group-hover:bg-accent-500 group-hover:text-white' :
                  service.color === 'success' ? 'bg-success-100 text-success-600 group-hover:bg-success-500 group-hover:text-white' :
                  'bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white'
                }`}>
                  <Icon name={service.icon} size="lg" />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sky-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Ver mas
                  <Icon name="arrow_forward" size="xs" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="animate-reveal">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                <Icon name="info" size="sm" />
                Sobre Nosotros
              </span>
              <h2 className="text-h2 text-brand-900 mb-6">
                FORCE PERU S.A.C.
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-accent-500 rounded-full mb-6" />
              <p className="text-xl text-brand-600 italic mb-6 font-medium">
                "Trabajamos para tu tranquilidad"
              </p>
              <p className="text-brand-600 leading-relaxed mb-6">
                Somos una empresa fundada en el ano 2012, comprometida en el cuidado y
                proteccion de la salud e integridad de nuestros clientes. Ofrecemos servicios
                de Saneamiento Ambiental y Seguridad Integral con los mas altos estandares de calidad.
              </p>
              <p className="text-brand-600 leading-relaxed mb-8">
                Contamos con un equipo de profesionales altamente capacitados y certificados,
                utilizando tecnologia de punta y productos de primera calidad para garantizar
                resultados optimos.
              </p>
              <Link
                to="/nosotros"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-900 text-white font-semibold rounded-xl hover:bg-brand-800 transition-all btn-press"
              >
                Conoce mas sobre nosotros
                <Icon name="arrow_forward" size="sm" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="animate-reveal-right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-sky-500/20 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-500/20 rounded-2xl" />
                <img
                  src="/images/edificio-force-peru.png"
                  alt="Edificio Force Peru SAC"
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 lg:py-24 bg-brand-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
                <Icon name="phone_in_talk" size="sm" className="text-sky-400" />
                Central Telefonica
              </span>
              <h2 className="text-h2 mb-2">
                Contactanos ahora
              </h2>
              <div className="w-16 h-1 bg-accent-500 mb-6" />
              <p className="text-white/70 mb-8 text-lg">
                Estamos aqui para asesorarte. Atencion de Lunes a Sabado de 9:00 a.m. a 7:00 p.m.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+5117646953"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-sky-400 transition-colors group"
                >
                  <span className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                    <Icon name="phone" size="lg" className="text-sky-400" />
                  </span>
                  (01) 764 6953
                </a>
                <a
                  href="tel:+51986536939"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-sky-400 transition-colors group"
                >
                  <span className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                    <Icon name="phone" size="lg" className="text-sky-400" />
                  </span>
                  986 536 939
                </a>
                <a
                  href="https://wa.me/51999925132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-2xl lg:text-3xl font-bold hover:text-green-400 transition-colors group"
                >
                  <span className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  999 925 132
                </a>
              </div>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-accent btn-press"
              >
                <Icon name="mail" size="sm" />
                ENVIAR MENSAJE
              </Link>
            </div>

            {/* Image */}
            <div className="hidden lg:block">
              <img
                src="/images/recepcion.jpg"
                alt="Recepcion Force Peru"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon} size="lg" className="text-sky-600" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-brand-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-brand-500 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-sky-500 to-sky-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-white mb-4">
            Necesitas nuestros servicios?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Contactanos hoy y recibe una cotizacion gratuita. Estamos listos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors btn-press"
            >
              SOLICITAR COTIZACION
            </Link>
            <a
              href="https://wa.me/51999925132"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 btn-press"
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
