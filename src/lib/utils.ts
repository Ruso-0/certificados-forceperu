import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateVerificationCode(): string {
  const year = new Date().getFullYear()
  const random = crypto.randomUUID().slice(0, 8).toUpperCase()
  return `FP-${year}-${random}`
}

export function formatDate(date: string | Date, locale = 'es-PE'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getVerificationUrl(code: string): string {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin
  return `${baseUrl}/verificar/${code}`
}
