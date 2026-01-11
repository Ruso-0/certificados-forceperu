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
    title: 'Ofrecemos soluciones integrales en seguridad y saneamiento ambiental',
    subtitle: 'Los mejores profesionales están en FORCE PERÚ',
    buttonText: 'VER MÁS',
    buttonLink: '/nosotros',
    secondaryButtonText: 'CONTÁCTENOS',
    secondaryButtonLink: '/contacto',
  },
  {
    id: 2,
    image: '/images/hero-slide-2.jpg',
    title: 'Manejo integrado de plagas alineados con los parámetros ambientales',
    subtitle: 'En armonía con el medio ambiente que nos rodea',
    buttonText: 'VER MÁS',
    buttonLink: '/servicios/saneamiento-ambiental',
  },
  {
    id: 3,
    image: '/images/hero-slide-3.jpg',
    title: 'Contamos con un equipo humano con experiencia en seguridad integral',
    subtitle: 'Con alta vocación de servicio orientado a la satisfacción del cliente',
    buttonText: 'VER MÁS',
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

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[currentSlide]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
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

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1
              key={`title-${currentSlide}`}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 animate-slide-in-left"
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              key={`subtitle-${currentSlide}`}
              className="text-lg sm:text-xl text-white/90 mb-8 animate-slide-in-left"
              style={{ animationDelay: '200ms' }}
            >
              {slide.subtitle}
            </p>

            {/* Buttons */}
            <div
              key={`buttons-${currentSlide}`}
              className="flex flex-wrap gap-4 animate-slide-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <Link
                to={slide.buttonLink}
                className="px-8 py-3 bg-brand text-white font-semibold rounded-md hover:bg-brand-dark transition-colors shadow-lg"
              >
                {slide.buttonText}
              </Link>
              {slide.secondaryButtonText && (
                <Link
                  to={slide.secondaryButtonLink || '/contacto'}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-brand-navy transition-colors"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Siguiente slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
