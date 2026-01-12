import { Link } from 'react-router-dom'
import { Hero } from '../../components/corporate/Hero'
import { Section, SectionHeader } from '../../components/corporate/Section'
import { Icon } from '../../components/ui/Icon'

const services = [
  {
    icon: 'pest_control',
    title: 'Saneamiento Ambiental',
    description: 'Control de plagas y fumigación profesional con productos certificados y eco-amigables.',
    href: '/servicios/saneamiento-ambiental',
  },
  {
    icon: 'security',
    title: 'Seguridad Integral',
    description: 'Vigilancia, resguardo y sistemas de seguridad para proteger tu empresa.',
    href: '/servicios/seguridad-integral',
  },
  {
    icon: 'school',
    title: 'Capacitación',
    description: 'Cursos certificados en seguridad, primeros auxilios y emergencias.',
    href: '/servicios/capacitacion',
  },
  {
    icon: 'cleaning_services',
    title: 'Limpieza',
    description: 'Servicios profesionales de limpieza integral para todo tipo de espacios.',
    href: '/servicios/limpieza',
  },
]

const stats = [
  { value: '+12', label: 'Años de Experiencia', icon: 'calendar_month' },
  { value: '+500', label: 'Clientes Satisfechos', icon: 'groups' },
  { value: '+1000', label: 'Proyectos Realizados', icon: 'task_alt' },
  { value: '24/7', label: 'Soporte Disponible', icon: 'support_agent' },
]

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Services Section */}
      <Section background="light">
        <SectionHeader
          badge="Nuestros Servicios"
          badgeIcon="auto_awesome"
          title="Soluciones completas para tu empresa"
          description="Ofrecemos servicios integrales de seguridad y saneamiento ambiental con los más altos estándares de calidad."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group bg-surface rounded-lg p-6 border border-border shadow-sm card-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-secondary">
                <Icon
                  name={service.icon}
                  size="lg"
                  className="text-secondary transition-colors group-hover:text-white"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-text mb-2 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
                Ver más
                <Icon name="arrow_forward" size="xs" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* About Preview Section */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              <Icon name="info" size="sm" />
              Sobre Nosotros
            </div>
            <h2 className="text-h2 text-text mb-6">
              FORCE PERÚ S.A.C.
            </h2>
            <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
            <p className="text-lg text-text-muted italic mb-6 font-medium">
              "Trabajamos para tu tranquilidad"
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Somos una empresa fundada en el año 2012, comprometida en el cuidado y
              protección de la salud e integridad de nuestros clientes. Ofrecemos servicios
              de Saneamiento Ambiental y Seguridad Integral con los más altos estándares de calidad.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              Contamos con un equipo de profesionales altamente capacitados y certificados,
              utilizando tecnología de punta y productos de primera calidad para garantizar
              resultados óptimos.
            </p>
            <Link
              to="/nosotros"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors btn-press"
            >
              Conoce más sobre nosotros
              <Icon name="arrow_forward" size="sm" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/images/edificio-force-peru.png"
              alt="Edificio Force Peru SAC"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="light" padding="md">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${index < stats.length - 1 ? 'lg:border-r lg:border-border' : ''}`}
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size="lg" className="text-secondary" />
              </div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-text mb-1">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section background="dark" padding="lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 text-white/80">
              <Icon name="phone_in_talk" size="sm" className="text-secondary-light" />
              Central Telefónica
            </div>
            <h2 className="text-h2 text-white mb-2">
              Contáctanos ahora
            </h2>
            <div className="w-16 h-1 bg-secondary mb-6" />
            <p className="text-white/70 mb-8 text-lg">
              Estamos aquí para asesorarte. Atención de Lunes a Sábado de 9:00 a.m. a 7:00 p.m.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="tel:+5117646953"
                className="flex items-center gap-4 text-xl lg:text-2xl font-bold text-white hover:text-secondary-light transition-colors group"
              >
                <span className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Icon name="phone" size="md" className="text-secondary-light" />
                </span>
                (01) 764 6953
              </a>
              <a
                href="tel:+51986536939"
                className="flex items-center gap-4 text-xl lg:text-2xl font-bold text-white hover:text-secondary-light transition-colors group"
              >
                <span className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Icon name="phone" size="md" className="text-secondary-light" />
                </span>
                986 536 939
              </a>
              <a
                href="https://wa.me/51999925132"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-xl lg:text-2xl font-bold text-white hover:text-success-light transition-colors group"
              >
                <span className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center group-hover:bg-success/30 transition-colors">
                  <svg className="w-6 h-6 text-success-light" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                999 925 132
              </a>
            </div>

            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-medium rounded-md hover:bg-accent-light transition-colors btn-press"
            >
              <Icon name="mail" size="sm" />
              Enviar mensaje
            </Link>
          </div>

          {/* Image */}
          <div className="hidden lg:block">
            <img
              src="/images/recepcion.jpg"
              alt="Recepción Force Peru"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section background="white" padding="md">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-h2 text-text mb-4">
            ¿Necesitas nuestros servicios?
          </h2>
          <p className="text-text-muted mb-8 text-lg">
            Contáctanos hoy y recibe una cotización gratuita. Estamos listos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="px-8 py-3.5 bg-primary text-white font-medium rounded-md hover:bg-primary-light transition-colors btn-press"
            >
              Solicitar cotización
            </Link>
            <a
              href="https://wa.me/51999925132"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-success text-white font-medium rounded-md hover:bg-success-light transition-colors flex items-center justify-center gap-2 btn-press"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}
