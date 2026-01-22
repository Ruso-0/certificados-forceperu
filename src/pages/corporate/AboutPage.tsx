import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'

const values = [
  {
    icon: 'verified_user',
    title: 'Compromiso',
    description: 'Nos comprometemos con la satisfacción total de nuestros clientes.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'workspace_premium',
    title: 'Calidad',
    description: 'Brindamos servicios con los más altos estándares de calidad.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: 'handshake',
    title: 'Confianza',
    description: 'Construimos relaciones duraderas basadas en la confianza.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: 'eco',
    title: 'Responsabilidad',
    description: 'Operamos de manera responsable con el medio ambiente.',
    color: 'from-green-500 to-emerald-500',
  },
]

const stats = [
  { value: '12+', label: 'Años de Experiencia', icon: 'calendar_month' },
  { value: '500+', label: 'Clientes Satisfechos', icon: 'groups' },
  { value: '24/7', label: 'Servicio Continuo', icon: 'schedule' },
  { value: '100%', label: 'Eco-Amigables', icon: 'eco' },
]

export function AboutPage() {
  return (
    <div className="bg-[#0B1220]">
      {/* Hero Section con Video de Fondo */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/about-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/70 via-[#0B1220]/50 to-[#0B1220]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col pt-0 pb-16 lg:justify-center lg:pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Badge */}
            <div className="flex justify-center mb-6 lg:mb-8 mt-2 lg:mt-0">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-white font-medium text-sm tracking-wide">DESDE 2012</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <span className="text-white">FORCE PERÚ </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SAC</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            </div>

            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
              {/* Card 1 - Nuestra Empresa */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                  <Icon name="apartment" size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nuestra Empresa</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Somos una empresa fundada en el año <strong className="text-cyan-400">2012</strong>, comprometida en el cuidado y protección de la salud e integridad de nuestros clientes.
                </p>
              </div>

              {/* Card 2 - Saneamiento */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Icon name="pest_control" size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Saneamiento Ambiental</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Proponemos soluciones inmediatas ante cualquier clase de infestación, controlando áreas contaminadas y mejorando la calidad ambiental.
                </p>
              </div>

              {/* Card 3 - Seguridad */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <Icon name="security" size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Seguridad Integral</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Brindamos seguridad a empresas públicas y privadas, planes de seguridad y capacitaciones para prevenir y minimizar amenazas.
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={stat.icon} size="sm" className="text-white" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="star" size="md" className="text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Por qué elegirnos</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Recursos físicos y tecnológicos eco-amigables',
                    'Resultados confiables y de alta calidad',
                    'Personal con alta vocación de servicio',
                    'Experiencia necesaria para garantizar satisfacción',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size="xs" className="text-cyan-400" />
                      </div>
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/30 text-lg"
              >
                <Icon name="contact_mail" size="md" />
                Conoce más sobre nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider mb-3">
              Nuestro Propósito
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Misión y Visión
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform opacity-80" />
              <div className="relative bg-slate-800 rounded-3xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="flag" size="xl" className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-cyan-400 font-medium uppercase tracking-wider">Nuestra</p>
                    <h3 className="text-2xl font-bold text-white">Misión</h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Brindar soluciones integrales en seguridad y saneamiento ambiental de alta calidad,
                  satisfaciendo las necesidades de nuestros clientes mediante servicios eficientes,
                  personal calificado y tecnología de vanguardia, contribuyendo a mejorar la calidad
                  de vida y proteger el medio ambiente.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform opacity-80" />
              <div className="relative bg-slate-800 rounded-3xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="visibility" size="xl" className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-400 font-medium uppercase tracking-wider">Nuestra</p>
                    <h3 className="text-2xl font-bold text-white">Visión</h3>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Ser reconocidos como la empresa líder en servicios de seguridad integral y
                  saneamiento ambiental en el Perú, destacando por nuestra excelencia operativa,
                  innovación constante y compromiso con la satisfacción de nuestros clientes y
                  el cuidado del medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider mb-3">
              Lo que nos define
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Los principios que guían cada una de nuestras acciones y decisiones
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-slate-700/50 group-hover:bg-white/10 rounded-2xl p-6 lg:p-8 text-center transition-colors duration-300 border border-slate-600 group-hover:border-transparent">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon name={value.icon} size="xl" className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 text-sm transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider mb-3">
              Respaldo Oficial
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Certificaciones y Acreditaciones
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Contamos con todas las certificaciones requeridas para operar con los más altos estándares
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <a
              href="https://www.sucamec.gob.pe/sel/faces/pub/VerificadorWeb.xhtml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-cyan-500/15 border border-cyan-500/30 backdrop-blur-sm rounded-2xl p-5 mb-2 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300">
                <img src="/images/logos/Logo-SUCAMEC.png" alt="SUCAMEC" className="h-14 lg:h-16 object-contain" />
              </div>
              <p className="text-sm text-white/70 group-hover:text-cyan-400 transition-colors font-medium">SUCAMEC</p>
            </a>
            <a
              href="https://www.digesa.minsa.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-cyan-500/15 border border-cyan-500/30 backdrop-blur-sm rounded-2xl p-5 mb-2 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300">
                <img src="/images/logos/Logo-DIGESA.png" alt="DIGESA" className="h-18 lg:h-20 object-contain" />
              </div>
              <p className="text-sm text-white/70 group-hover:text-cyan-400 transition-colors font-medium">DIGESA</p>
            </a>
            <a
              href="https://portal.indeci.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-cyan-500/15 border border-cyan-500/30 backdrop-blur-sm rounded-2xl p-5 mb-2 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300">
                <img src="/images/Logo_INDECI.png" alt="INDECI" className="h-14 lg:h-16 object-contain" />
              </div>
              <p className="text-sm text-white/70 group-hover:text-cyan-400 transition-colors font-medium">INDECI</p>
            </a>
            <a
              href="https://www.iso.org/es/home/standards/committee-for-conformity-assessm/casco-1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-cyan-500/15 border border-cyan-500/30 backdrop-blur-sm rounded-2xl p-5 mb-2 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-300">
                <img src="/images/logos/Logo-ISO.gif" alt="ISO 9001" className="h-14 lg:h-16 object-contain" />
              </div>
              <p className="text-sm text-white/70 group-hover:text-cyan-400 transition-colors font-medium">ISO 9001</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#0B1220] to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Contáctanos y descubre cómo podemos ayudarte a proteger lo que más importa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0B1220] font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              Solicitar Cotización
              <Icon name="arrow_forward" size="sm" />
            </Link>
            <a
              href="https://wa.me/51907544736"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
