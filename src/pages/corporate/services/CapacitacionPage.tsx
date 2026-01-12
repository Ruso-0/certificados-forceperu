import { Link } from 'react-router-dom'
import { Icon } from '../../../components/ui/Icon'

const features = [
  'Gestión de Riesgos de Desastres',
  'Inspecciones Técnicas de Seguridad (ITSE)',
  'Primeros Auxilios y RCP',
  'Uso de extintores y evacuación',
  'Seguridad y Salud en el Trabajo',
  'Defensa Personal',
  'Manejo de Crisis',
  'Brigadas de Emergencia',
]

const benefits = [
  {
    icon: 'workspace_premium',
    title: 'Certificación Oficial',
    description: 'Emitimos certificados con validez oficial para cumplir con normativas laborales.',
  },
  {
    icon: 'groups',
    title: 'Instructores Expertos',
    description: 'Profesionales con amplia experiencia y certificaciones SUCAMEC.',
  },
  {
    icon: 'handyman',
    title: 'Práctica Real',
    description: 'Capacitaciones teórico-prácticas con simulacros y ejercicios reales.',
  },
  {
    icon: 'tune',
    title: 'Personalizado',
    description: 'Programas adaptados a las necesidades específicas de cada empresa.',
  },
]

export function CapacitacionPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[500px] lg:h-[700px]">
        <img
          src="/images/capacitacion.jpg"
          alt="Capacitación y Entrenamiento"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Capacitación y Entrenamiento
            </h1>
            <p className="text-xl text-white/90 max-w-xl">
              Formación profesional con certificación oficial
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
            <span className="text-text-muted">Capacitación y Entrenamiento</span>
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
                Formación Profesional
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />

              <div className="text-text-muted space-y-4">
                <p>
                  En <strong className="text-text">Force Perú SAC</strong> ofrecemos programas de capacitación y
                  entrenamiento diseñados para fortalecer las competencias del personal en
                  materia de seguridad, prevención de riesgos y respuesta ante emergencias.
                </p>
                <p>
                  Nuestros cursos combinan teoría y práctica, con simulacros y ejercicios
                  que permiten a los participantes adquirir habilidades reales para actuar
                  de manera efectiva ante situaciones de emergencia.
                </p>
                <p>
                  Contamos con instructores certificados por SUCAMEC y con amplia experiencia
                  en el sector de seguridad. Al finalizar cada curso, emitimos certificados
                  con validez oficial que cumplen con las normativas laborales vigentes.
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-text mb-4">Cursos Disponibles:</h3>
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
                <h3 className="text-xl font-display font-bold mb-2">¿Interesado en nuestros cursos?</h3>
                <p className="text-white/80 mb-4">
                  Consulta fechas disponibles y precios corporativos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contacto"
                    className="px-6 py-2.5 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors text-center"
                  >
                    Consultar
                  </Link>
                  <a
                    href="https://wa.me/51999925132?text=Hola,%20me%20interesa%20información%20sobre%20los%20cursos%20de%20capacitación"
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
              ¿Por qué capacitarse con nosotros?
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

      {/* Verification CTA */}
      <section className="py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-display font-bold text-white mb-2">
            ¿Ya tienes un certificado de Force Perú?
          </h3>
          <p className="text-white/70 mb-4">
            Verifica la autenticidad de tu certificado ingresando el código de verificación.
          </p>
          <Link
            to="/verificar"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary text-white font-medium rounded-md hover:bg-secondary-light transition-colors"
          >
            <Icon name="qr_code_scanner" size="sm" />
            Verificar Certificado
          </Link>
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
              <Icon name="pest_control" className="text-secondary" />
              <span className="font-medium text-text">Saneamiento Ambiental</span>
            </Link>
            <Link
              to="/servicios/seguridad-integral"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <Icon name="security" className="text-secondary" />
              <span className="font-medium text-text">Seguridad Integral</span>
            </Link>
            <Link
              to="/servicios/limpieza"
              className="p-4 bg-bg rounded-lg hover:bg-secondary/5 transition-colors flex items-center gap-3 border border-border"
            >
              <Icon name="cleaning_services" className="text-secondary" />
              <span className="font-medium text-text">Limpieza</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
