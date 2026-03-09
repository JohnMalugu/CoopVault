import React from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-primary-500 hover:bg-primary-700 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400',
  accent:    'bg-accent-500 hover:bg-accent-700 text-white',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  success:   'bg-emerald-500 hover:bg-emerald-600 text-white',
  ghost:     'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
}

export const Button: React.FC<Props> = ({
  variant = 'primary', size = 'md', loading, icon, children, className, disabled, ...props
}) => (
  <button
    {...props}
    disabled={disabled || loading}
    className={clsx(
      'inline-flex items-center font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}
  >
    {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : icon}
    {children}
  </button>
)
