import { Link } from 'react-router-dom'
import { Icon } from '../../../components/ui/Icon'

const features = [
  'Fumigación residencial y comercial',
  'Control de roedores (desratización)',
  'Desinsectación y control de plagas',
  'Desinfección de ambientes',
  'Control de aves',
  'Tratamiento de áreas verdes',
]

const benefits = [
  {
    icon: 'eco',
    title: 'Productos Eco-Amigables',
    description: 'Utilizamos productos certificados que no dañan el medio ambiente ni la salud de las personas.',
  },
  {
    icon: 'verified_user',
    title: 'Personal Certificado',
    description: 'Nuestro equipo cuenta con certificación DIGESA y capacitación continua.',
  },
  {
    icon: 'schedule',
    title: 'Servicio Programado',
    description: 'Ofrecemos planes de mantenimiento preventivo para mantener tus espacios libres de plagas.',
  },
  {
    icon: 'description',
    title: 'Certificación',
    description: 'Emitimos certificados de fumigación válidos para inspecciones sanitarias.',
  },
]

export function SaneamientoPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[400px] lg:h-[500px]">
        <img
          src="/images/service-saneamiento.jpg"
          alt="Saneamiento Ambiental"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Saneamiento Ambiental
            </h1>
            <p className="text-xl text-white/90 max-w-xl">
              Control de plagas y fumigación con productos eco-amigables
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
            <span className="text-text-muted">Saneamiento Ambiental</span>
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
                Control Integral de Plagas
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mb-6" />

              <div className="text-text-muted space-y-4">
                <p>
                  En <strong className="text-text">Force Perú SAC</strong> brindamos servicios de saneamiento ambiental
                  con un enfoque integral y responsable. Proponemos soluciones inmediatas ante
                  cualquier clase de infestación, con el fin de controlar áreas contaminadas,
                  mejorar la calidad ambiental y mitigar los riesgos para la salud.
                </p>
                <p>
                  Utilizamos productos de última generación, certificados y eco-amigables,
                  que garantizan resultados efectivos sin dañar el medio ambiente ni poner
                  en riesgo la salud de las personas y mascotas.
                </p>
                <p>
                  Nuestro equipo de profesionales está certificado por DIGESA y cuenta con
                  amplia experiencia en el control de plagas urbanas en diversos sectores:
                  residencial, comercial, industrial y de salud.
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-text mb-4">Nuestros Servicios:</h3>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size="xs" className="text-secondary" />
                      </div>
                      <span className="text-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video / Image */}
            <div>
              <div className="bg-bg rounded-lg overflow-hidden aspect-video mb-6 border border-border">
                {/* Video placeholder - reemplazar con video real */}
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
                    href="https://wa.me/51907544736?text=Hola,%20me%20interesa%20el%20servicio%20de%20saneamiento%20ambiental"
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
