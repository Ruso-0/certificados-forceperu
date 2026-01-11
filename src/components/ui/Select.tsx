import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = 'Seleccionar...',
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || props.name

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-navy"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-12 px-4 pr-10 rounded-xl appearance-none',
              'bg-white border border-gray-200',
              'text-navy',
              'font-body text-base',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              'transition-all duration-200',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Icon name="expand_more" size="sm" />
          </div>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <Icon name="error" size="sm" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${selectId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
