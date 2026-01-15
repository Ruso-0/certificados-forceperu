import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '../../components/ui'

export function HomePage() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll tracking for header
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  // Smooth scroll with offset for fixed header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  // Preload hero image and trigger animation
  useEffect(() => {
    const img = new Image()
    img.src = '/images/hero-bg.jpeg'
    img.onload = () => {
      setImageLoaded(true)
    }
  }, [])

  // Parallax effect on scroll
  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        const rate = scrolled * 0.5
        heroRef.current.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${rate}px)`
      }
    }
    window.addEventListener('scroll', handleParallax)
    return () => window.removeEventListener('scroll', handleParallax)
  }, [])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      navigate(`/verificar/${code.trim()}`)
    }
  }

  // Countdown para el curso PMI - 21 enero 2026
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2026-01-21T09:00:00')
    const interval = setInterval(() => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',system-ui,sans-serif]">
      {/* Skip to main content - Accessibility */}
      <a href="#inicio" className="skip-link" onClick={(e) => scrollToSection(e, 'inicio')}>
        Ir al contenido principal
      </a>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'bg-white shadow-md py-3'
            : 'bg-white/95 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-eagle.png"
                alt="Force Perú S.A.C."
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="font-bold text-[#1a3a5c] text-xl tracking-tight">FORCE PERÚ S.A.C.</h1>
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Centro de Formación y Especialización</p>
              </div>
            </div>

            {/* Navigation with active state */}
            <nav className="hidden xl:flex items-center gap-8">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'servicios', label: 'Servicios' },
                { id: 'cursos', label: 'Cursos' },
                { id: 'videos', label: 'Videos' },
                { id: 'verificar', label: 'Verificar' },
                { id: 'contacto', label: 'Contacto' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-[13px] font-medium transition-all tracking-wide relative py-2 ${
                    activeSection === item.id
                      ? 'text-[#1a3a5c]'
                      : 'text-gray-600 hover:text-[#1a3a5c]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Right side - Social + Intranet */}
            <div className="flex items-center gap-5">
              {/* Social Icons */}
              <div className="hidden md:flex items-center gap-3">
                <a
                  href="https://www.facebook.com/people/FORCE-PER%C3%9A/100091540102786/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-100 hover:bg-[#1877f2] rounded-full flex items-center justify-center transition-all group"
                >
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/forceperusac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-100 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-full flex items-center justify-center transition-all group"
                >
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-gray-200" />

              {/* Intranet Button - Desktop */}
              <Link to="/admin/login" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a87] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#1a3a5c]/25 transition-all flex items-center gap-2">
                  <Icon name="lock" size="sm" />
                  Intranet
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Menú"
              >
                {mobileMenuOpen ? (
                  <Icon name="close" className="text-[#1a3a5c]" />
                ) : (
                  <Icon name="menu" className="text-[#1a3a5c]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="py-5 border-t border-gray-100 mt-4">
              <div className="flex flex-col gap-1">
                {[
                  { id: 'inicio', label: 'Inicio', icon: 'home', desc: 'Página principal' },
                  { id: 'nosotros', label: 'Nosotros', icon: 'groups', desc: 'Conócenos' },
                  { id: 'servicios', label: 'Servicios', icon: 'shield', desc: 'Áreas de especialización' },
                  { id: 'cursos', label: 'Cursos', icon: 'school', desc: 'Programas de formación' },
                  { id: 'videos', label: 'Videos', icon: 'play_circle', desc: 'Material promocional' },
                  { id: 'verificar', label: 'Verificar Certificado', icon: 'qr_code_scanner', desc: 'Validar autenticidad' },
                  { id: 'contacto', label: 'Contacto', icon: 'mail', desc: 'Escríbenos' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-50 to-transparent text-[#1a3a5c]'
                        : 'text-gray-700 hover:text-[#1a3a5c] hover:bg-gradient-to-r hover:from-cyan-50 hover:to-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-br from-cyan-100 to-cyan-50'
                        : 'bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-cyan-100 group-hover:to-cyan-50'
                    }`}>
                      <Icon
                        name={item.icon}
                        className={`transition-colors ${activeSection === item.id ? 'text-cyan-600' : 'text-gray-400 group-hover:text-cyan-600'}`}
                        style={{ fontSize: '20px' }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[15px]">{item.label}</div>
                      <div className={`text-xs ${activeSection === item.id ? 'text-cyan-600/70' : 'text-gray-400 group-hover:text-cyan-600/70'}`}>{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Mobile Social + Intranet */}
              <div className="mt-5 pt-5 border-t border-gray-100 px-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">Síguenos</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/people/FORCE-PER%C3%9A/100091540102786/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-100 hover:bg-[#1877f2] rounded-xl flex items-center justify-center transition-all group"
                    >
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/forceperusac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-100 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-xl flex items-center justify-center transition-all group"
                    >
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/51907544736"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-gray-100 hover:bg-[#25D366] rounded-xl flex items-center justify-center transition-all group"
                    >
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                  <Link to="/admin/login" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                    <button className="px-5 py-3 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a87] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                      <Icon name="lock" size="sm" />
                      Intranet
                    </button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium Design */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with parallax feel */}
        <div
          ref={heroRef}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/hero-bg.jpeg)' }}
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#1a3a5c]/90 to-[#0a1628]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-60" />
        </div>

        {/* Static geometric shapes - ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full transition-all duration-[3000ms] delay-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-full h-full bg-gradient-to-br from-yellow-400/15 to-transparent rounded-full blur-3xl" />
          </div>
          <div className={`absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full transition-all duration-[3000ms] delay-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-full h-full bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          {/* Main content */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left content - 7 cols */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className={`transition-all duration-1000 delay-300 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full group hover:bg-white/10 transition-all cursor-default">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-sm text-white/80 font-medium tracking-wide">Centro CEFOESP Autorizado</span>
                  <div className="w-px h-4 bg-white/20" />
                  <Icon name="verified" className="text-yellow-400" style={{ fontSize: '18px' }} />
                  <span className="text-sm text-yellow-400 font-semibold">SUCAMEC</span>
                </div>
              </div>

              {/* Main heading */}
              <div className={`space-y-4 transition-all duration-1000 delay-500 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight">
                  <span className="block">Formamos</span>
                  <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                    Profesionales
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl mt-4 font-semibold text-white/90">
                    en Seguridad Integral
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className={`transition-all duration-1000 delay-700 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
                  Certificación oficial con validez nacional. Instructores acreditados, metodología moderna y
                  <span className="text-white/90 font-medium"> más de 15 años formando agentes de seguridad privada.</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-1000 delay-900 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a href="#cursos" onClick={(e) => scrollToSection(e, 'cursos')}>
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0a1628] font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Inscríbete Ahora
                      <Icon name="arrow_forward" style={{ fontSize: '20px' }} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </a>
                <a href="#nosotros" onClick={(e) => scrollToSection(e, 'nosotros')}>
                  <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2">
                    <Icon name="play_circle" style={{ fontSize: '22px' }} className="text-white/70 group-hover:text-white transition-colors" />
                    Conoce más
                  </button>
                </a>
              </div>

              {/* Stats row */}
              <div className={`grid grid-cols-3 gap-6 pt-10 mt-6 border-t border-white/10 transition-all duration-1000 delay-[1100ms] ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  { number: '500+', label: 'Egresados', icon: 'school' },
                  { number: '15+', label: 'Años', icon: 'schedule' },
                  { number: '100%', label: 'Certificados', icon: 'verified' },
                ].map((stat, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={stat.icon} className="text-yellow-400/70 group-hover:text-yellow-400 transition-colors" style={{ fontSize: '20px' }} />
                      <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                        {stat.number}
                      </span>
                    </div>
                    <span className="text-sm text-white/40 tracking-wide group-hover:text-white/60 transition-colors">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - 5 cols - Feature cards */}
            <div className={`lg:col-span-5 transition-all duration-1000 delay-[800ms] ${imageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative group/card">
                {/* Static outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-amber-300/15 to-yellow-400/20 rounded-[28px] blur-xl" />
                <div className="absolute -inset-px bg-gradient-to-r from-yellow-400/30 via-transparent to-amber-400/30 rounded-[26px]" />

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-[#0d1f35]/95 via-[#152a45]/95 to-[#0d1f35]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 overflow-hidden">

                  {/* Top border glow */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                  <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent blur-sm" />

                  {/* Header */}
                  <div className="flex items-center gap-5 mb-10 relative">
                    {/* Badge icon */}
                    <div className="relative">
                      {/* Outer glow ring - static */}
                      <div className="absolute -inset-3 bg-gradient-to-br from-yellow-400/30 to-amber-500/30 rounded-3xl blur-xl" />
                      {/* Badge container */}
                      <div className="relative w-[72px] h-[72px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/40 overflow-hidden">
                        {/* Inner shine */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40" />
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                        <Icon name="workspace_premium" className="text-[#0a1628] relative z-10 drop-shadow-sm" style={{ fontSize: '36px' }} />
                      </div>
                      {/* Verified check with pop animation */}
                      <div className={`absolute -top-1.5 -right-1.5 w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-[3px] border-[#0d1f35] flex items-center justify-center shadow-lg shadow-emerald-500/50 ${imageLoaded ? 'animate-check-pop' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                        <Icon name="check" className="text-white drop-shadow-sm" style={{ fontSize: '14px', strokeWidth: 3 }} />
                      </div>
                    </div>
                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Certificación Oficial</h3>
                      <p className="text-yellow-400/80 text-sm font-medium flex items-center gap-2">
                        <Icon name="shield" className="text-yellow-400/70" style={{ fontSize: '14px' }} />
                        Validez Nacional
                      </p>
                    </div>
                  </div>

                  {/* Features list - hover to highlight */}
                  <div className="space-y-3 mb-10">
                    {[
                      { icon: 'verified_user', text: 'Registro SUCAMEC vigente' },
                      { icon: 'school', text: 'Instructores acreditados' },
                      { icon: 'qr_code_2', text: 'Certificados con verificación QR' },
                      { icon: 'groups', text: 'Formación teórico-práctica' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`group flex items-center gap-4 p-4 rounded-xl cursor-default relative overflow-hidden bg-white/[0.03] border border-white/[0.05] transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400/15 hover:via-yellow-400/10 hover:to-transparent hover:border-yellow-400/30 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      >
                        <div className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/10 group-hover:bg-gradient-to-br group-hover:from-yellow-400/30 group-hover:to-yellow-400/10">
                          <Icon
                            name={item.icon}
                            className="transition-all duration-300 text-white/60 group-hover:text-yellow-400"
                            style={{ fontSize: '22px' }}
                          />
                        </div>
                        <span className="relative font-medium transition-colors duration-300 text-white/70 group-hover:text-yellow-400 flex-1">
                          {item.text}
                        </span>
                        {/* Check icon appears on hover */}
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                          <Icon name="check_circle" className="text-emerald-400" style={{ fontSize: '20px' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button with shine effect */}
                  <a href="#cursos" onClick={(e) => scrollToSection(e, 'cursos')} className="block relative">
                    <button className="relative w-full py-4 bg-white text-[#0a1628] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden hover:shadow-xl hover:shadow-white/20 active:scale-[0.98]">
                      {/* Shine effect */}
                      <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
                      <span className="relative">Ver Próximo Curso</span>
                      <Icon name="arrow_forward" style={{ fontSize: '18px' }} className="relative group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </a>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-white/50 text-xs group/trust cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/trust:bg-white/10 transition-colors">
                        <Icon name="lock" style={{ fontSize: '16px' }} className="group-hover/trust:text-emerald-400 transition-colors" />
                      </div>
                      <span className="group-hover/trust:text-white/70 transition-colors">Pago seguro</span>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex items-center gap-2.5 text-white/50 text-xs group/trust cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/trust:bg-white/10 transition-colors">
                        <Icon name="headset_mic" style={{ fontSize: '16px' }} className="group-hover/trust:text-yellow-400 transition-colors" />
                      </div>
                      <span className="group-hover/trust:text-white/70 transition-colors">Soporte 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1500ms] ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#nosotros" onClick={(e) => scrollToSection(e, 'nosotros')} className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors cursor-pointer group">
              <span className="text-xs tracking-widest uppercase">Explorar</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1.5">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-28 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-semibold text-[#1a3a5c] tracking-[0.2em] uppercase">Sobre Nosotros</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-8 tracking-tight leading-tight">
                Excelencia en Formación de Seguridad
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                <strong className="text-gray-900">FORCE PERÚ S.A.C.</strong> es un Centro de Formación y Especialización en Seguridad Privada
                (CEFOESP) debidamente autorizado por la Superintendencia Nacional de Control de Servicios de Seguridad,
                Armas, Municiones y Explosivos de Uso Civil (SUCAMEC).
              </p>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                Nuestra misión es formar profesionales competentes y comprometidos con los más altos estándares
                de seguridad, brindando capacitación integral con instructores acreditados y metodología moderna.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '15+', label: 'Años de trayectoria' },
                  { number: '500+', label: 'Egresados certificados' },
                  { number: '20+', label: 'Programas de formación' },
                  { number: '98%', label: 'Tasa de aprobación' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl font-bold text-[#1a3a5c] tracking-tight">{stat.number}</div>
                    <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: 'verified',
                  title: 'Autorización SUCAMEC',
                  desc: 'Centro debidamente registrado y autorizado para impartir formación en seguridad privada.'
                },
                {
                  icon: 'school',
                  title: 'Instructores Certificados',
                  desc: 'Personal docente con amplia experiencia y acreditación oficial en seguridad.'
                },
                {
                  icon: 'workspace_premium',
                  title: 'Certificación con Validez Nacional',
                  desc: 'Certificados reconocidos oficialmente con sistema de verificación digital QR.'
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 lg:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1a3a5c]/10 to-[#1a3a5c]/5 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-[#1a3a5c]" style={{ fontSize: '30px' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-sm font-semibold text-[#1a3a5c] tracking-[0.2em] uppercase">Nuestros Servicios</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              Áreas de Especialización
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ofrecemos programas de formación especializados en diversas áreas de seguridad y servicios complementarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'security',
                iconImage: '/images/icons/seguridad-icon.png',
                title: 'Seguridad Privada',
                desc: 'Formación integral para agentes de vigilancia y protección patrimonial.',
                accent: '#1a5fb4'
              },
              {
                icon: 'domain',
                title: 'Inspecciones ITSE',
                desc: 'Especialización en Inspecciones Técnicas de Seguridad en Edificaciones.',
                accent: '#6366f1'
              },
              {
                icon: 'emergency',
                title: 'Gestión de Riesgos',
                desc: 'Prevención, reducción y manejo del riesgo de desastres.',
                accent: '#ea580c'
              },
              {
                icon: 'eco',
                title: 'Saneamiento Ambiental',
                desc: 'Técnicas de desinfección, fumigación y control de plagas.',
                accent: '#16a34a'
              },
            ].map((service, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.accent}10`,
                  }}
                >
                  {service.iconImage ? (
                    <img src={service.iconImage} alt="" className="w-7 h-7 object-contain" />
                  ) : (
                    <Icon
                      name={service.icon}
                      style={{ fontSize: '28px', color: service.accent }}
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{service.desc}</p>
                <div
                  className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: service.accent }}
                >
                  <span>Ver más</span>
                  <Icon name="arrow_forward" style={{ fontSize: '16px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curso PMI - Destacado */}
      <section id="cursos" className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background con gradiente y patrón */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2840] via-[#1a3a5c] to-[#0f2840]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header de sección */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400/20 border border-yellow-400/30 rounded-full mb-6">
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-300 font-semibold tracking-wide text-sm">INSCRIPCIONES ABIERTAS</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Conviértete en <span className="text-yellow-400">Oficial de Seguridad Privada</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Certificación oficial SUCAMEC con instructores acreditados
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left - Main Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Top Banner - With Fire Animation */}
              <div className="bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="animate-fire">
                    <Icon name="local_fire_department" className="text-yellow-300 drop-shadow-lg" style={{ fontSize: '28px' }} />
                  </div>
                  <div>
                    <span className="text-white font-bold tracking-wide text-sm lg:text-base">CUPOS LIMITADOS</span>
                    <span className="hidden sm:inline text-white/80 text-sm ml-2">· Solo 25 vacantes</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-xs font-semibold tracking-wide">ENERO 2026</span>
                </div>
              </div>

              <div className="p-6 lg:p-10">
                {/* Course Title */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#1a3a5c] to-[#2d5a87] rounded-2xl flex items-center justify-center shadow-xl shrink-0">
                    <Icon name="military_tech" className="text-yellow-400" style={{ fontSize: '36px' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-1">Curso PMI</h3>
                    <p className="text-sm lg:text-base text-[#1a3a5c] font-medium">Programa de Instrucción para Oficiales de Seguridad Privada</p>
                  </div>
                </div>

                {/* Benefits Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: 'school', text: '9 días intensivos' },
                    { icon: 'workspace_premium', text: 'Certificado nacional' },
                    { icon: 'badge', text: 'Licencias L1, L4, L5' },
                    { icon: 'verified_user', text: 'Instructores SUCAMEC' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-9 h-9 bg-[#1a3a5c]/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon name={item.icon} className="text-[#1a3a5c]" style={{ fontSize: '20px' }} />
                      </div>
                      <span className="text-gray-700 text-xs lg:text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Instructor Photos - Circular */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-4">Nuestros Instructores</p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-3 border-white shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                          {/* Placeholder for photo */}
                          <Icon name="person" className="text-gray-400" style={{ fontSize: '28px' }} />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">+10 Instructores</p>
                      <p className="text-gray-500 text-xs">Acreditados SUCAMEC</p>
                    </div>
                  </div>
                </div>

                {/* Video del Curso PMI */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Video del Curso</p>
                  <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <video
                      className="w-full h-auto"
                      controls
                      preload="metadata"
                      poster=""
                    >
                      <source src="/curso-pmi-video.mp4" type="video/mp4" />
                      Tu navegador no soporta videos HTML5.
                    </video>
                  </div>
                </div>

                {/* Countdown Section - Redesigned */}
                <div className="bg-gradient-to-br from-[#0f2840] to-[#1a3a5c] rounded-2xl p-5 lg:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="schedule" className="text-yellow-400" style={{ fontSize: '20px' }} />
                      <span className="text-white/90 font-medium text-sm">Inicio del curso:</span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-400/20 px-3 py-1 rounded-full">
                      <Icon name="event" className="text-yellow-400" style={{ fontSize: '16px' }} />
                      <span className="text-yellow-400 font-bold text-sm">21 Enero 2026</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 lg:gap-3">
                    {[
                      { value: countdown.days, label: 'Días' },
                      { value: countdown.hours, label: 'Horas' },
                      { value: countdown.minutes, label: 'Min' },
                      { value: countdown.seconds, label: 'Seg' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-3 lg:p-4 text-center border border-white/5">
                        <div className="text-2xl lg:text-3xl font-bold text-white font-mono tracking-tight">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-[10px] lg:text-xs text-white/50 mt-1 tracking-wide uppercase">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://wa.me/51907544736?text=Hola,%20quiero%20inscribirme%20en%20el%20Curso%20PMI%20que%20inicia%20el%2021%20de%20enero.%20¿Cuáles%20son%20los%20requisitos?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full py-4 lg:py-5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-base lg:text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 active:scale-[0.98]">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    ¡INSCRÍBETE AHORA!
                  </button>
                </a>
                <p className="text-center text-gray-400 text-xs mt-3">Respuesta inmediata por WhatsApp</p>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="lg:col-span-5 space-y-5">
              {/* Price Card - Redesigned */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2d5a87] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                        <Icon name="account_balance_wallet" className="text-white" style={{ fontSize: '18px' }} />
                      </div>
                      <span className="text-white font-bold tracking-wide">INVERSIÓN</span>
                    </div>
                  </div>
                </div>
                {/* Price Content */}
                <div className="p-6">
                  {/* Promo Badge */}
                  <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-full">
                      <Icon name="sell" style={{ fontSize: '18px' }} />
                      <span className="font-bold text-sm">DESCUENTO 15%</span>
                    </div>
                  </div>
                  {/* Prices */}
                  <div className="text-center mb-4">
                    <div className="text-gray-400 line-through text-base mb-1">S/ 1,100.00</div>
                    <div className="text-5xl lg:text-6xl font-bold text-[#1a3a5c] tracking-tight">S/ 950</div>
                    <div className="text-gray-500 text-sm mt-2">Pago único · Materiales incluidos</div>
                  </div>
                  {/* Payment Methods */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs text-gray-500 text-center mb-3 font-medium">Métodos de pago aceptados</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      {/* Visa */}
                      <div className="h-10 w-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                        <svg className="h-6" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg">
                          <path d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763H278.198zm246.11-191.98c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.863 26.551-90.18 64.604-.297 28.129 26.514 43.822 46.752 53.185 20.77 9.597 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.274l-6.876-3.112-7.489 43.822c12.463 5.466 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.884.199-22.27-14.016-39.216-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.447-.271 30.088 3.534 39.936 7.5l4.781 2.259 7.233-42.426zm137.31-3.792h-41.232c-12.773 0-22.332 3.486-27.94 16.234l-79.245 179.402h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 7.006 6.472 29.334 6.472 29.334h49.512l-43.165-195.636zm-65.417 126.41c4.413-11.279 21.26-54.723 21.26-54.723-.314.534 4.381-11.33 7.074-18.684l3.606 16.879s10.217 46.729 12.352 56.528h-44.292zM85.04 334.228l-52.239-133.496-.057-.026-5.566-26.998c-9.73-31.199-40.083-65.011-74.066-81.933l47.833 171.14.007-.004 56.071.023 83.426-195.64H83.32L.152 138.464l-.004-.002-.148.001z" fill="#1A1F71"/>
                          <path d="M132.22 138.465H45.879l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.414l-18.71-89.96c-3.23-12.396-12.597-16.096-23.885-16.527z" fill="#F9A51A"/>
                        </svg>
                      </div>
                      {/* Mastercard */}
                      <div className="h-10 w-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                        <svg className="h-7" viewBox="0 0 152 100" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="47" cy="50" r="35" fill="#EB001B"/>
                          <circle cx="105" cy="50" r="35" fill="#F79E1B"/>
                          <path d="M76 22c10.4 8.4 17 21.2 17 35.5S86.4 78.6 76 87c-10.4-8.4-17-21.2-17-35.5S65.6 30.4 76 22z" fill="#FF5F00"/>
                        </svg>
                      </div>
                      {/* Yape */}
                      <div className="h-10 w-16 rounded-lg flex items-center justify-center shadow-sm overflow-hidden bg-white border border-gray-100">
                        <img src="/yape-logo.avif" alt="Yape" className="h-8 w-auto object-contain" />
                      </div>
                      {/* Plin */}
                      <div className="h-10 w-16 rounded-lg flex items-center justify-center shadow-sm overflow-hidden" style={{ background: 'linear-gradient(135deg, #00E5BE 0%, #00C9A7 100%)' }}>
                        <span className="text-white text-xs font-extrabold tracking-tight">plin</span>
                      </div>
                      {/* Interbank */}
                      <div className="h-10 w-16 bg-[#00A94F] rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
                        <span className="text-white text-[9px] font-bold tracking-tight leading-none text-center">Inter<br/>bank</span>
                      </div>
                      {/* BCP */}
                      <div className="h-10 w-16 bg-[#002A8D] rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
                        <span className="text-white text-xs font-bold">BCP</span>
                      </div>
                      {/* Cash */}
                      <div className="h-10 px-3 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm gap-1.5">
                        <Icon name="payments" className="text-gray-600" style={{ fontSize: '18px' }} />
                        <span className="text-gray-600 text-[11px] font-medium">Cash</span>
                      </div>
                    </div>
                  </div>
                  {/* Facilidades */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 mt-4">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <Icon name="verified" style={{ fontSize: '18px' }} />
                      <span className="font-semibold text-sm">Facilidades de pago disponibles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-white/20">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm tracking-wide">
                  <Icon name="checklist" style={{ fontSize: '20px' }} className="text-yellow-400" />
                  ¿QUÉ INCLUYE?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'menu_book', text: '5 días teoría' },
                    { icon: 'fitness_center', text: '4 días práctica' },
                    { icon: 'description', text: 'Material didáctico' },
                    { icon: 'workspace_premium', text: 'Certificado oficial' },
                    { icon: 'badge', text: 'Carnet estudiante' },
                    { icon: 'support_agent', text: 'Asesoría post-curso' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/90 bg-white/5 rounded-lg p-2.5">
                      <Icon name={item.icon} className="text-yellow-400/80" style={{ fontSize: '16px' }} />
                      <span className="text-xs font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 text-xs tracking-wider uppercase">¿Tienes dudas?</h4>
                <a href="tel:+51907544736" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a87] rounded-xl text-white hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon name="call" style={{ fontSize: '24px' }} />
                  </div>
                  <div>
                    <div className="text-xs text-white/70">Llámanos ahora</div>
                    <div className="font-bold text-xl tracking-wide">907 544 736</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos & Promoción Section */}
      <section id="videos" className="py-28 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-sm font-semibold text-[#1a3a5c] tracking-[0.2em] uppercase">Material Audiovisual</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              Videos y Promoción
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Conoce más sobre nuestros programas de formación, instalaciones y metodología de enseñanza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Curso PMI - Formación de Agentes',
                description: 'Conoce el programa de instrucción para agentes de seguridad privada con certificación SUCAMEC.',
                poster: '/images/hero-bg.jpeg',
                videoSrc: ''
              },
              {
                title: 'Nuestras Instalaciones',
                description: 'Recorre nuestro centro de formación equipado con aulas y áreas de práctica especializadas.',
                poster: '/images/hero-bg.jpeg',
                videoSrc: ''
              },
              {
                title: 'Testimonios de Egresados',
                description: 'Escucha la experiencia de nuestros profesionales formados en Force Perú CEFOESP.',
                poster: '/images/hero-bg.jpeg',
                videoSrc: ''
              },
            ].map((video, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                {/* Video Container with Lazy Loading */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  {video.videoSrc ? (
                    <video
                      className="w-full h-full object-cover"
                      poster={video.poster}
                      controls
                      preload="none"
                      playsInline
                      aria-label={video.title}
                    >
                      <source src={video.videoSrc} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  ) : (
                    <>
                      <img
                        src={video.poster}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Icon name="play_arrow" className="text-[#1a3a5c] ml-1" style={{ fontSize: '32px' }} />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                        Próximamente
                      </div>
                    </>
                  )}
                </div>
                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{video.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA para más contenido */}
          <div className="mt-14 text-center">
            <a
              href="https://www.youtube.com/@forceperusac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ver más en YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Certificate Verification */}
      <section id="verificar" className="py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-semibold text-[#1a3a5c] tracking-[0.2em] uppercase">Verificación Digital</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-8 tracking-tight leading-tight">
                Sistema de Verificación de Certificados
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                Todos nuestros certificados cuentan con un código único de verificación y código QR
                que permite validar su autenticidad de manera instantánea. Este sistema garantiza
                la legitimidad de las certificaciones emitidas por Force Perú CEFOESP.
              </p>

              <div className="space-y-6">
                {[
                  { step: '1', title: 'Ingrese el código', desc: 'Escriba el código de verificación que aparece en el certificado' },
                  { step: '2', title: 'Validación automática', desc: 'El sistema consulta nuestra base de datos oficial' },
                  { step: '3', title: 'Resultado inmediato', desc: 'Visualice el estado y datos completos del certificado' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a5c] to-[#2d5a87] rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{item.title}</div>
                      <div className="text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-200">
              <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1a3a5c] to-[#2d5a87] rounded-xl flex items-center justify-center shadow-lg">
                  <Icon name="qr_code_scanner" className="text-white" style={{ fontSize: '30px' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">Verificar Certificado</h3>
                  <p className="text-gray-500 mt-1">Validación oficial e instantánea</p>
                </div>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Código de Verificación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: FP-2026-A1B2C3D4"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-5 py-5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/20 transition-all font-mono text-center text-xl tracking-[0.15em]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="w-full py-5 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a87] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1a3a5c]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  <Icon name="search" />
                  Verificar Certificado
                </button>
              </form>

              <p className="mt-8 text-center text-gray-500">
                El código de verificación se encuentra en la parte inferior del certificado
                o puede escanear el código QR con su dispositivo móvil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-sm font-semibold text-[#1a3a5c] tracking-[0.2em] uppercase">Contacto</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              ¿Tiene alguna consulta?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Estamos a su disposición para brindarle toda la información que necesite sobre nuestros programas de formación.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              {
                icon: 'phone',
                title: 'Teléfono',
                value: '907 544 736',
                link: 'tel:+51907544736'
              },
              {
                icon: 'mail',
                title: 'Correo Electrónico',
                value: 'forceperusac@gmail.com',
                link: 'mailto:forceperusac@gmail.com'
              },
              {
                icon: 'language',
                title: 'Sitio Web',
                value: 'www.force-peru.com',
                link: 'https://www.force-peru.com'
              },
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="text-center p-10 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-18 h-18 bg-gradient-to-br from-[#1a3a5c] to-[#2d5a87] rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform" style={{ width: '72px', height: '72px' }}>
                    <Icon name={item.icon} className="text-white" style={{ fontSize: '30px' }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-[#1a3a5c] font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="https://wa.me/51907544736?text=Hola,%20deseo%20información%20sobre%20los%20programas%20de%20formación" target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 hover:shadow-lg text-lg">
                <Icon name="chat" />
                Escribir por WhatsApp
              </button>
            </a>
            <a href="mailto:forceperusac@gmail.com" target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-5 border-2 border-[#1a3a5c] text-[#1a3a5c] font-semibold rounded-xl hover:bg-[#1a3a5c] hover:text-white transition-all flex items-center justify-center gap-3 text-lg">
                <Icon name="mail" />
                Enviar Correo
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2840] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logo-eagle.png"
                  alt="Force Perú S.A.C."
                  className="w-11 h-11 object-contain brightness-0 invert opacity-90"
                />
                <div>
                  <h4 className="font-bold text-white text-xl tracking-tight">FORCE PERÚ S.A.C.</h4>
                  <p className="text-xs text-white/50 tracking-[0.15em]">CEFOESP</p>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed max-w-md">
                Centro de Formación y Especialización en Seguridad Privada, autorizado por SUCAMEC.
                Formando profesionales de excelencia desde hace más de 15 años.
              </p>

              {/* Social Icons Footer */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.facebook.com/people/FORCE-PER%C3%9A/100091540102786/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#1877f2] rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/forceperusac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-5 tracking-wide">Enlaces Rápidos</h4>
              <div className="space-y-3">
                <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="block text-white/60 hover:text-white transition-colors cursor-pointer">Inicio</a>
                <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="block text-white/60 hover:text-white transition-colors cursor-pointer">Servicios</a>
                <a href="#cursos" onClick={(e) => scrollToSection(e, 'cursos')} className="block text-white/60 hover:text-white transition-colors cursor-pointer">Cursos</a>
                <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="block text-white/60 hover:text-white transition-colors cursor-pointer">Videos</a>
                <a href="#verificar" onClick={(e) => scrollToSection(e, 'verificar')} className="block text-white/60 hover:text-white transition-colors cursor-pointer">Verificar Certificado</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-5 tracking-wide">Contacto</h4>
              <div className="space-y-3">
                <a href="tel:+51907544736" className="block text-white/60 hover:text-white transition-colors">Tel: 907 544 736</a>
                <a href="mailto:forceperusac@gmail.com" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">forceperusac@gmail.com</a>
                <p className="text-white/60">Lima, Perú</p>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Force Perú S.A.C. Todos los derechos reservados.
            </p>
            <p className="text-white/40 text-xs tracking-wide">
              Sistema de Certificados Digitales con Verificación QR
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
