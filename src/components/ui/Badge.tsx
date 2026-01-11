import { cn } from '../../lib/utils'
import { Icon } from './Icon'

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  neutral: 'bg-gray-100 text-gray-800 border-gray-200',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <Icon name={icon} size="xs" />}
      {children}
    </span>
  )
}
