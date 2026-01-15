import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { useEffect, useRef } from 'react'

const values = [
  {
    icon: 'verified_user',
    title: 'Compromiso',
    description: 'Nos comprometemos con la satisfacción total de nuestros clientes.',
  },
  {
    icon: 'workspace_premium',
    title: 'Calidad',
    description: 'Brindamos servicios con los más altos estándares de calidad.',
  },
  {
    icon: 'handshake',
    title: 'Confianza',
    description: 'Construimos relaciones duraderas basadas en la confianza.',
  },
  {
    image: '/images/responsabilidad-icon.png',
    title: 'Responsabilidad',
    description: 'Operamos de manera responsable con el medio ambiente.',
  },
]

export function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [])

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] lg:h-[400px] bg-gray-400">
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-in-left">
              Nosotros
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
            <span className="text-gray-600">Nosotros</span>
          </nav>
        </div>
      </div>

      {/* Main Content with Video Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[700px] lg:min-h-[800px]">
        {/* Video Background - Centered lower */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          >
            <source src="/videos/about-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Title with Animation */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary/10 rounded-full mb-8 animate-float-badge">
              <div className="w-2 h-2 bg-secondary rounded-full animate-icon-pulse" />
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Desde 2012</span>
              <div className="w-2 h-2 bg-secondary rounded-full animate-icon-pulse" />
            </div>

            <h2 className="text-primary text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6 animate-slide-in-left">
              FORCE PERÚ <span className="text-secondary">SAC</span>
            </h2>

            <div className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent w-32 mx-auto animate-line-expand" />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Main Description */}
            <div className="space-y-8">
              <div className="animate-stagger-1">
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name="business" size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">Nuestra Empresa</h3>
                    <p className="text-text-muted leading-relaxed">
                      Somos una empresa fundada en el año <strong className="text-primary">2012</strong>, comprometida
                      en el cuidado y protección de la salud e integridad de nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-stagger-2">
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                  <div className="w-14 h-14 bg-success rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name="eco" size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">Saneamiento Ambiental</h3>
                    <p className="text-text-muted leading-relaxed">
                      Proponemos soluciones inmediatas ante cualquier clase de infestación, controlando
                      áreas contaminadas, mejorando la calidad ambiental y mitigando riesgos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-stagger-3">
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name="security" size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">Seguridad Integral</h3>
                    <p className="text-text-muted leading-relaxed">
                      Brindamos seguridad a empresas públicas y privadas, planes de seguridad,
                      capacitaciones con el objetivo de prevenir y minimizar cualquier amenaza.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Features */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-stat-1 p-6 bg-primary text-white rounded-2xl text-center shadow-xl">
                  <div className="text-4xl lg:text-5xl font-display font-bold mb-2">+12</div>
                  <div className="text-white/80 text-sm font-medium">Años de Experiencia</div>
                </div>
                <div className="animate-stat-2 p-6 bg-secondary text-white rounded-2xl text-center shadow-xl">
                  <div className="text-4xl lg:text-5xl font-display font-bold mb-2">+500</div>
                  <div className="text-white/80 text-sm font-medium">Clientes Satisfechos</div>
                </div>
                <div className="animate-stat-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl text-center shadow-lg border border-white/50">
                  <div className="text-4xl lg:text-5xl font-display font-bold text-primary mb-2">24/7</div>
                  <div className="text-text-muted text-sm font-medium">Servicio Continuo</div>
                </div>
                <div className="animate-stat-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl text-center shadow-lg border border-white/50">
                  <div className="text-4xl lg:text-5xl font-display font-bold text-success mb-2">100%</div>
                  <div className="text-text-muted text-sm font-medium">Eco-Amigables</div>
                </div>
              </div>

              {/* Features List */}
              <div className="animate-stagger-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <h3 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
                  <Icon name="star" size="sm" className="text-accent" />
                  Por qué elegirnos
                </h3>
                <ul className="space-y-3">
                  {[
                    'Recursos físicos y tecnológicos eco-amigables',
                    'Resultados confiables y de alta calidad',
                    'Personal con alta vocación de servicio',
                    'Experiencia necesaria para garantizar satisfacción',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-muted">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size="xs" className="text-secondary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="animate-stagger-5">
                <Link
                  to="/contacto"
                  className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-primary text-white font-semibold rounded-2xl shadow-xl hover:bg-primary-light transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <span>Conoce más sobre nosotros</span>
                  <Icon name="arrow_forward" size="sm" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-lg card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center">
                  <Icon name="flag" size="lg" className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Brindar soluciones integrales en seguridad y saneamiento ambiental de alta calidad,
                satisfaciendo las necesidades de nuestros clientes mediante servicios eficientes,
                personal calificado y tecnología de vanguardia, contribuyendo a mejorar la calidad
                de vida y proteger el medio ambiente.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-lg card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center">
                  <Icon name="visibility" size="lg" className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ser reconocidos como la empresa líder en servicios de seguridad integral y
                saneamiento ambiental en el Perú, destacando por nuestra excelencia operativa,
                innovación constante y compromiso con la satisfacción de nuestros clientes y
                el cuidado del medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
              Nuestros Valores
            </h2>
            <div className="w-16 h-1 bg-brand mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.image ? (
                    <img src={value.image} alt={value.title} className="w-14 h-14 object-contain" />
                  ) : (
                    <Icon name={value.icon!} size="xl" className="text-secondary" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-white/80 mb-8">
            Contáctanos y descubre cómo podemos ayudarte a proteger lo que más importa.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            CONTÁCTENOS
            <Icon name="arrow_forward" size="sm" />
          </Link>
        </div>
      </section>
    </div>
  )
}
