import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const services = [
  { name: 'Saneamiento Ambiental', href: '/servicios/saneamiento-ambiental', icon: 'pest_control' },
  { name: 'Seguridad Integral', href: '/servicios/seguridad-integral', icon: 'security' },
  { name: 'Capacitación', href: '/servicios/capacitacion', icon: 'school' },
  { name: 'Limpieza', href: '/servicios/limpieza', icon: 'cleaning_services' },
]

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Servicios', href: '/servicios', hasDropdown: true },
  { name: 'Verificar Certificado', href: '/verificar' },
  { name: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar - Only on desktop */}
      <div className="hidden lg:block bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              <a href="tel:+5117646953" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Icon name="phone" size="xs" />
                (01) 764 6953
              </a>
              <a href="mailto:info@forceperu.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Icon name="mail" size="xs" />
                info@forceperu.com
              </a>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-white/70">
                <Icon name="schedule" size="xs" />
                Lun - Sáb: 9:00 AM - 7:00 PM
              </span>
              <a
                href="https://wa.me/51999925132"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-success-light hover:text-success transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo-force-peru.png"
                alt="Force Peru SAC"
                className="h-14 w-auto"
              />
              <div>
                <span className="font-display font-bold text-2xl text-primary block leading-tight">
                  FORCE PERÚ
                </span>
                <span className="text-secondary text-xs font-semibold tracking-[0.2em]">
                  S.A.C.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        to={item.href}
                        className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-lg ${
                          isActive(item.href)
                            ? 'text-secondary bg-secondary/5'
                            : 'text-text hover:text-secondary hover:bg-secondary/5'
                        }`}
                      >
                        {item.name}
                        <Icon
                          name="expand_more"
                          size="sm"
                          className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </Link>

                      {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl py-3 border border-border">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                location.pathname === service.href
                                  ? 'text-secondary bg-secondary/5'
                                  : 'text-text-muted hover:text-secondary hover:bg-secondary/5'
                              }`}
                            >
                              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <Icon name={service.icon} size="sm" className="text-secondary" />
                              </div>
                              <span className="font-medium">{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActive(item.href)
                          ? 'text-secondary bg-secondary/5'
                          : 'text-text hover:text-secondary hover:bg-secondary/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <Link
                to="/contacto"
                className="ml-4 px-6 py-3 bg-secondary text-white font-semibold text-sm rounded-lg hover:bg-secondary-light transition-colors shadow-lg shadow-secondary/20"
              >
                Cotizar ahora
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text hover:bg-bg transition-colors"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="lg" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isActive(item.href)
                              ? 'text-secondary bg-secondary/5'
                              : 'text-text hover:bg-bg'
                          }`}
                        >
                          {item.name}
                          <Icon
                            name="expand_more"
                            size="sm"
                            className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isServicesOpen && (
                          <div className="pl-4 mt-1 space-y-1">
                            {services.map((service) => (
                              <Link
                                key={service.href}
                                to={service.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                                  location.pathname === service.href
                                    ? 'text-secondary bg-secondary/5'
                                    : 'text-text-muted hover:text-secondary hover:bg-bg'
                                }`}
                              >
                                <Icon name={service.icon} size="sm" className="text-secondary" />
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'text-secondary bg-secondary/5'
                            : 'text-text hover:bg-bg'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <Link
                  to="/contacto"
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg font-semibold text-sm"
                >
                  Cotizar ahora
                </Link>

                {/* Mobile Contact Info */}
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <a href="tel:+5117646953" className="flex items-center gap-2 text-text-muted text-sm">
                    <Icon name="phone" size="sm" className="text-secondary" />
                    (01) 764 6953
                  </a>
                  <a
                    href="https://wa.me/51999925132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-success text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp: 999 925 132
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
