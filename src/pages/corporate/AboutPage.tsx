import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'

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
    icon: 'eco',
    title: 'Responsabilidad',
    description: 'Operamos de manera responsable con el medio ambiente.',
  },
]

export function AboutPage() {
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

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
                FORCE PERÚ SAC
              </h2>
              <div className="w-16 h-1 bg-brand mb-6" />

              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Somos una empresa fundada en el año <strong>2012</strong>, comprometida en el cuidado
                  y protección de la salud e integridad de nuestros clientes.
                </p>
                <p className="mb-4">
                  Ofrecemos el servicio de <strong>Saneamiento Ambiental</strong>, proponemos soluciones
                  inmediatas ante cualquier clase de infestación, con el fin de controlar áreas
                  contaminadas, mejorar la calidad ambiental y mitigar los riesgos.
                </p>
                <p className="mb-4">
                  Asimismo, el servicio de <strong>Seguridad Integral</strong>, donde brindamos seguridad
                  a empresas públicas y privadas, planes de seguridad, capacitaciones a personal
                  acerca de temas de seguridad y resguardos, con el objetivo de prevenir y minimizar
                  cualquier clase de amenaza existente.
                </p>
                <p>
                  Para lograrlo, contamos con recursos físicos y tecnológicos eco-amigables que nos
                  brindan resultados confiables y de la más alta calidad. Además, de personal
                  familiarizado con las políticas y procedimientos de FORCE PERÚ S.A.C. Al igual
                  que con alta vocación de servicio y experiencia necesaria para garantizar la
                  satisfacción de nuestros clientes.
                </p>
              </div>
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
                <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={value.icon} size="xl" className="text-brand" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-white/80 mb-8">
            Contáctanos y descubre cómo podemos ayudarte a proteger lo que más importa.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            CONTÁCTENOS
            <Icon name="arrow_forward" size="sm" />
          </Link>
        </div>
      </section>
    </div>
  )
}
