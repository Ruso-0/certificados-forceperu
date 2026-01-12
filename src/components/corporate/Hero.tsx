import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export function Hero({
  title = 'Soluciones integrales en seguridad y saneamiento ambiental',
  subtitle = 'Desde 2012 protegiendo tu tranquilidad',
  description = 'Ofrecemos servicios profesionales de seguridad, saneamiento ambiental, capacitación y limpieza con los más altos estándares de calidad.',
  primaryCTA = { text: 'Conoce nuestros servicios', href: '/servicios' },
  secondaryCTA = { text: 'Contáctanos', href: '/contacto' },
  backgroundImage = '/images/hero-bg.jpeg',
}: HeroProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay - Sutil */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge - Estático, sin animación */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10">
            <span className="w-2 h-2 bg-secondary rounded-full" />
            <span className="text-white/90 text-sm font-medium">
              {subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-hero text-white mb-6">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to={primaryCTA.href}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-secondary text-white font-medium rounded-md hover:bg-secondary-light transition-colors duration-200 btn-press"
            >
              {primaryCTA.text}
              <Icon
                name="arrow_forward"
                size="sm"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to={secondaryCTA.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white hover:text-primary transition-all duration-200"
            >
              {secondaryCTA.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators - Subtle bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {[
              { icon: 'verified', text: 'Empresa Certificada' },
              { icon: 'workspace_premium', text: 'ISO 9001' },
              { icon: 'shield', text: 'Licencia SUCAMEC' },
              { icon: 'eco', text: 'Productos Eco-amigables' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/80">
                <Icon name={item.icon} size="sm" className="text-secondary-light" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
