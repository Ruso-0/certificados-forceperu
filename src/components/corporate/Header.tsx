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
              <a href="tel:+51907544736" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Icon name="phone" size="xs" />
                907 544 736
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
                href="https://wa.me/51907544736"
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
                      className="relative group"
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

                      {/* Dropdown con puente invisible para mantener hover */}
                      <div className={`absolute top-full left-0 pt-2 ${isServicesOpen ? 'block' : 'hidden'}`}>
                        {/* Puente invisible */}
                        <div className="absolute -top-2 left-0 w-full h-2" />
                        <div className="w-72 bg-white rounded-xl shadow-xl py-3 border border-border animate-dropdown">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                                location.pathname === service.href
                                  ? 'text-secondary bg-secondary/5'
                                  : 'text-text-muted hover:text-secondary hover:bg-secondary/5 hover:pl-5'
                              }`}
                            >
                              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                                <Icon name={service.icon} size="sm" className="text-secondary" />
                              </div>
                              <span className="font-medium">{service.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
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
            <div className="lg:hidden py-6 border-t border-border bg-gradient-to-b from-white to-slate-50/50">
              <nav className="flex flex-col gap-1 px-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                            isActive(item.href)
                              ? 'text-secondary bg-secondary/10 shadow-sm'
                              : 'text-text hover:bg-secondary/5'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                              <Icon name="work" size="sm" className="text-secondary" />
                            </div>
                            {item.name}
                          </span>
                          <Icon
                            name="expand_more"
                            size="sm"
                            className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isServicesOpen && (
                          <div className="ml-4 mt-2 space-y-1 border-l-2 border-secondary/20 pl-4">
                            {services.map((service) => (
                              <Link
                                key={service.href}
                                to={service.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                  location.pathname === service.href
                                    ? 'text-secondary bg-secondary/10 font-medium'
                                    : 'text-text-muted hover:text-secondary hover:bg-secondary/5'
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
                        className={`flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-secondary bg-secondary/10 shadow-sm'
                            : 'text-text hover:bg-secondary/5'
                        }`}
                      >
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Icon
                            name={
                              item.href === '/' ? 'home' :
                              item.href === '/nosotros' ? 'info' :
                              item.href === '/verificar' ? 'verified' :
                              item.href === '/contacto' ? 'mail' : 'link'
                            }
                            size="sm"
                            className="text-secondary"
                          />
                        </div>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <Link
                  to="/contacto"
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-secondary to-secondary-light text-white rounded-xl font-semibold text-base shadow-lg shadow-secondary/30 active:scale-[0.98] transition-transform"
                >
                  <Icon name="request_quote" size="sm" />
                  Solicitar Cotización
                </Link>

                {/* Mobile Contact Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-4">Contáctanos</p>

                  <div className="space-y-3">
                    <a
                      href="tel:+51907544736"
                      className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-border hover:border-secondary/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Icon name="phone" size="sm" className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Teléfono / WhatsApp</p>
                        <p className="font-semibold text-text">907 544 736</p>
                      </div>
                    </a>

                    <a
                      href="mailto:info@forceperu.com"
                      className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-border hover:border-secondary/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Icon name="mail" size="sm" className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Correo</p>
                        <p className="font-semibold text-text">info@forceperu.com</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-4">Síguenos</p>

                  <div className="flex items-center justify-center gap-4 px-4">
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/p/FORCE-PER%C3%9A-100091540102786/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                      style={{ backgroundColor: '#1877F2' }}
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/51907544736"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                      style={{ backgroundColor: '#25D366' }}
                      aria-label="WhatsApp"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/forceperusac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                      style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>

                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@forceperusac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-black"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
