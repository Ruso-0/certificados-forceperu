import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'white' | 'light' | 'dark'
  padding?: 'sm' | 'md' | 'lg'
}

interface SectionHeaderProps {
  badge?: string
  badgeIcon?: string
  title: string
  description?: string
  centered?: boolean
}

export function Section({
  children,
  className = '',
  id,
  background = 'white',
  padding = 'lg',
}: SectionProps) {
  const bgClasses = {
    white: 'bg-surface',
    light: 'bg-bg',
    dark: 'bg-primary text-white',
  }

  const paddingClasses = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-20',
    lg: 'py-20 lg:py-28',
  }

  return (
    <section
      id={id}
      className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4 ${centered ? '' : ''}`}>
          {badgeIcon && (
            <span className="material-symbols-rounded text-base">{badgeIcon}</span>
          )}
          {badge}
        </div>
      )}
      <h2 className="text-h2 text-text mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-text-muted text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
