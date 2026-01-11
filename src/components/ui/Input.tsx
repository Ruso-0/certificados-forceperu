import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: string
  rightElement?: ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightElement,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-navy"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name={leftIcon} size="sm" />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-12 px-4 rounded-xl',
              'bg-white border border-gray-200',
              'text-navy placeholder:text-gray-400',
              'font-body text-base',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
              leftIcon && 'pl-11',
              rightElement && 'pr-12',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <Icon name="error" size="sm" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
