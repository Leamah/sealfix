import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatZAR(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatSqm(value: number): string {
  return `${value.toLocaleString('en-ZA')} m²`
}

export function formatLinearMeters(value: number): string {
  return `${value.toLocaleString('en-ZA')} lm`
}
