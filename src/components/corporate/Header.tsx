import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const services = [
  { name: 'Saneamiento Ambiental', href: '/servicios/saneamiento-ambiental' },
  { name: 'Seguridad Integral', href: '/servicios/seguridad-integral' },
  { name: 'Capacitación y Entrenamiento', href: '/servicios/capacitacion' },
  { name: 'Limpieza de Ambientes', href: '/servicios/limpieza' },
]

const navItems = [
  { name: 'INICIO', href: '/' },
  { name: 'NOSOTROS', href: '/nosotros' },
  { name: 'SERVICIOS', href: '/servicios', hasDropdown: true },
  { name: 'CONTACTO', href: '/contacto' },
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

  // Close mobile menu on route change (but keep services dropdown open if on services page)
  useEffect(() => {
    setIsMobileMenuOpen(false)
    // Keep dropdown open if navigating within services
    if (!location.pathname.startsWith('/servicios')) {
      setIsServicesOpen(false)
    }
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-force-peru.png"
              alt="Force Perú SAC"
              className="h-12 w-auto"
            />
            <span
              className={`font-bold text-xl hidden sm:block transition-colors ${
                isScrolled ? 'text-brand' : 'text-white'
              }`}
            >
              FORCE PERÚ SAC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive(item.href)
                          ? isScrolled
                            ? 'text-brand'
                            : 'text-white border-b-2 border-white'
                          : isScrolled
                          ? 'text-gray-700 hover:text-brand'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <Icon
                        name="expand_more"
                        size="sm"
                        className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown Menu - stays open on click */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-2 animate-dropdown">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              location.pathname === service.href
                                ? 'text-brand bg-brand/5 font-medium'
                                : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                            }`}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? isScrolled
                          ? 'text-brand'
                          : 'text-white border-b-2 border-white'
                        : isScrolled
                        ? 'text-gray-700 hover:text-brand'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/51999925132"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                isScrolled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
            >
              <Icon name="phone" size="sm" />
              999 925 132
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="lg" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1 bg-white rounded-xl shadow-xl p-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'text-brand bg-brand/5'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        <Icon
                          name="expand_more"
                          size="sm"
                          className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isServicesOpen && (
                        <div className="pl-4 mt-1 space-y-1">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                location.pathname === service.href
                                  ? 'text-brand bg-brand/5'
                                  : 'text-gray-600 hover:text-brand hover:bg-gray-50'
                              }`}
                            >
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
                          ? 'text-brand bg-brand/5'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile WhatsApp */}
              <a
                href="https://wa.me/51999925132"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition-colors"
              >
                <Icon name="phone" size="sm" />
                999 925 132
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
