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
      setIsScrolled(window.scrollY > 20)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo-force-peru.png"
              alt="Force Peru SAC"
              className="h-10 lg:h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span
                className={`font-display font-bold text-lg lg:text-xl tracking-tight transition-colors duration-200 ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              >
                FORCE PERÚ
              </span>
              <span
                className={`block text-xs font-semibold tracking-widest transition-colors duration-200 ${
                  isScrolled ? 'text-secondary' : 'text-white/80'
                }`}
              >
                S.A.C.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 rounded-md ${
                        isActive(item.href)
                          ? isScrolled
                            ? 'text-secondary'
                            : 'text-white'
                          : isScrolled
                          ? 'text-text-muted hover:text-primary'
                          : 'text-white/80 hover:text-white'
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
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 animate-dropdown border border-border">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === service.href
                                ? 'text-secondary bg-secondary/5'
                                : 'text-text-muted hover:text-primary hover:bg-bg'
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
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      isActive(item.href)
                        ? isScrolled
                          ? 'text-secondary'
                          : 'text-white'
                        : isScrolled
                        ? 'text-text-muted hover:text-primary'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button - Simple */}
            <Link
              to="/contacto"
              className={`ml-4 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 btn-press ${
                isScrolled
                  ? 'bg-primary text-white hover:bg-primary-light'
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Contáctanos
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? 'text-primary hover:bg-bg'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-1 bg-white rounded-lg shadow-lg p-4 border border-border">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
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
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-md transition-colors ${
                                location.pathname === service.href
                                  ? 'text-secondary bg-secondary/5'
                                  : 'text-text-muted hover:text-primary hover:bg-bg'
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
                      className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
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
                className="mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-md font-medium text-sm hover:bg-primary-light transition-colors"
              >
                Contáctanos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
