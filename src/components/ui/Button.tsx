import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: string
  rightIcon?: string
  isLoading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-primary',
  secondary: 'bg-navy hover:bg-navy-light text-white',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
  ghost: 'bg-transparent hover:bg-gray-100 text-navy',
  danger: 'bg-error hover:bg-red-600 text-white',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      isLoading,
      fullWidth,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-semibold rounded-xl',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'btn-press',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Icon name="progress_activity" size="sm" className="animate-spin" />
        ) : leftIcon ? (
          <Icon name={leftIcon} size="sm" />
        ) : null}
        {children}
        {rightIcon && !isLoading && <Icon name={rightIcon} size="sm" />}
      </button>
    )
  }
)

Button.displayName = 'Button'
