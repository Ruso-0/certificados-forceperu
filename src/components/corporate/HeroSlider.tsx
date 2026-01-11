import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero-slide-1.jpg',
    title: 'Soluciones integrales en seguridad y saneamiento ambiental',
    subtitle: 'Los mejores profesionales estan en FORCE PERU',
    buttonText: 'CONOCENOS',
    buttonLink: '/nosotros',
    secondaryButtonText: 'CONTACTANOS',
    secondaryButtonLink: '/contacto',
  },
  {
    id: 2,
    image: '/images/hero-slide-2.jpg',
    title: 'Manejo integrado de plagas con estandares ambientales',
    subtitle: 'En armonia con el medio ambiente que nos rodea',
    buttonText: 'VER SERVICIO',
    buttonLink: '/servicios/saneamiento-ambiental',
  },
  {
    id: 3,
    image: '/images/hero-slide-3.jpg',
    title: 'Equipo humano con experiencia en seguridad integral',
    subtitle: 'Alta vocacion de servicio orientado a la satisfaccion del cliente',
    buttonText: 'VER SERVICIO',
    buttonLink: '/servicios/seguridad-integral',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[currentSlide]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-sky-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              key={`badge-${currentSlide}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-slide-in-left"
            >
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse-cta" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Desde 2012 protegiendo tu tranquilidad
              </span>
            </div>

            {/* Title */}
            <h1
              key={`title-${currentSlide}`}
              className="text-hero text-white mb-6 animate-slide-in-left"
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              key={`subtitle-${currentSlide}`}
              className="text-lg sm:text-xl text-white/80 mb-10 animate-slide-in-left max-w-xl"
              style={{ animationDelay: '150ms' }}
            >
              {slide.subtitle}
            </p>

            {/* Buttons */}
            <div
              key={`buttons-${currentSlide}`}
              className="flex flex-wrap gap-4 animate-slide-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                to={slide.buttonLink}
                className="group px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-accent btn-press flex items-center gap-2"
              >
                {slide.buttonText}
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              {slide.secondaryButtonText && (
                <Link
                  to={slide.secondaryButtonLink || '/contacto'}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-brand-900 transition-all"
                >
                  {slide.secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all group"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all group"
        aria-label="Siguiente slide"
      >
        <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent-500 w-10'
                : 'bg-white/40 hover:bg-white/60 w-3'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-float" />
        </div>
      </div>
    </section>
  )
}
