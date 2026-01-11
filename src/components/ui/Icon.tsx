import { cn } from '../../lib/utils'
import type { CSSProperties } from 'react'

interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  filled?: boolean
  className?: string
  style?: CSSProperties
}

const sizeMap = {
  xs: 'text-base',
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

export function Icon({ name, size = 'md', filled = false, className, style }: IconProps) {
  return (
    <span
      className={cn(
        'material-symbols-rounded',
        filled && 'filled',
        sizeMap[size],
        className
      )}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
