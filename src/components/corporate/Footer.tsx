import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const services = [
  { name: 'Saneamiento Ambiental', href: '/servicios/saneamiento-ambiental' },
  { name: 'Seguridad Integral', href: '/servicios/seguridad-integral' },
  { name: 'Capacitacion y Entrenamiento', href: '/servicios/capacitacion' },
  { name: 'Limpieza de Ambientes', href: '/servicios/limpieza' },
]

const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img
                src="/images/logo-force-peru.png"
                alt="Force Peru SAC"
                className="h-14 w-auto brightness-0 invert transition-transform group-hover:scale-105"
              />
            </Link>
            <h3 className="font-display text-2xl font-bold mb-1">FORCE PERU</h3>
            <p className="text-sky-400 font-semibold text-sm tracking-widest mb-4">S.A.C.</p>
            <p className="text-brand-300 text-sm leading-relaxed">
              Soluciones integrales en seguridad y saneamiento ambiental.
              Trabajamos para tu tranquilidad desde 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">
              Enlaces Rapidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-brand-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Icon name="chevron_right" size="xs" className="text-brand-500 group-hover:text-sky-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-brand-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Icon name="chevron_right" size="xs" className="text-brand-500 group-hover:text-sky-400 transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-white">
              Contactanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="location_on" size="sm" className="text-sky-400" />
                </div>
                <span className="text-brand-300 text-sm">
                  Lima, Peru
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center flex-shrink-0">
                  <Icon name="phone" size="sm" className="text-sky-400" />
                </div>
                <div className="text-sm space-y-1">
                  <a href="tel:+5117646953" className="text-brand-300 hover:text-white transition-colors block">
                    (01) 764 6953
                  </a>
                  <a href="tel:+51986536939" className="text-brand-300 hover:text-white transition-colors block">
                    986 536 939
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <a
                  href="https://wa.me/51999925132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors text-sm font-medium"
                >
                  999 925 132
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center flex-shrink-0">
                  <Icon name="schedule" size="sm" className="text-sky-400" />
                </div>
                <span className="text-brand-300 text-sm">
                  Lun - Sab: 9:00 AM - 7:00 PM
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8 flex gap-3">
              <a
                href="https://www.facebook.com/people/FORCE-PER%C3%9A/100091540102786/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-800 flex items-center justify-center hover:bg-sky-600 transition-colors group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-brand-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                </svg>
              </a>
              <a
                href="https://wa.me/51999925132"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center hover:bg-green-500 transition-colors group"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-brand-400 text-sm text-center sm:text-left">
              &copy; {currentYear} Force Peru S.A.C. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/admin/login"
                className="text-brand-500 hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <Icon name="lock" size="xs" />
                Intranet
              </Link>
              <Link
                to="/verificar"
                className="text-brand-500 hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <Icon name="verified" size="xs" />
                Verificar Certificado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
