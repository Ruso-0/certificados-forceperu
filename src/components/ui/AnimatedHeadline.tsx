import { useMemo } from 'react'

interface AnimatedHeadlineProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
  delayMs?: number
  staggerMs?: number
  underline?: boolean
  underlineColor?: string
}

/**
 * AnimatedHeadline - Componente de texto con animación stagger premium
 *
 * Funcionamiento:
 * - Cada letra tiene un delay incremental (stagger) para aparecer en secuencia
 * - Animación: translateY(14px) + blur(6px) → translateY(0) + blur(0)
 * - El underline aparece después de que termina la última letra
 * - Respeta prefers-reduced-motion automáticamente via CSS
 *
 * Ajuste de timings:
 * - delayMs: tiempo antes de iniciar (default: 120ms)
 * - staggerMs: delay entre cada letra (default: 28ms)
 * - Duración de cada letra: 500ms (en CSS)
 * - Underline aparece: delayMs + (letras * staggerMs) + 120ms
 */
export function AnimatedHeadline({
  text,
  as: Tag = 'h1',
  className = '',
  delayMs = 120,
  staggerMs = 28,
  underline = false,
  underlineColor = '#0284C7',
}: AnimatedHeadlineProps) {
  const letters = useMemo(() => {
    return text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Non-breaking space for proper spacing
      delay: delayMs + index * staggerMs,
    }))
  }, [text, delayMs, staggerMs])

  const underlineDelay = delayMs + text.length * staggerMs + 120

  return (
    <Tag className={`animated-headline ${className}`}>
      {/* Screen reader text */}
      <span className="sr-only">{text}</span>

      {/* Animated letters */}
      <span className="animated-headline__letters" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="animated-headline__char"
            style={{ animationDelay: `${letter.delay}ms` }}
          >
            {letter.char}
          </span>
        ))}
      </span>

      {/* Underline */}
      {underline && (
        <span
          className="animated-headline__underline"
          style={{
            animationDelay: `${underlineDelay}ms`,
            backgroundColor: underlineColor,
          }}
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
