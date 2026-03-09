import React from 'react'
import { clsx } from 'clsx'

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'

interface Props {
  variant?: Variant
  children: React.ReactNode
  dot?: boolean
}

const variantClasses: Record<Variant, string> = {
  success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
  danger:  'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400',
  info:    'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400',
  neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  primary: 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400',
}

export const Badge: React.FC<Props> = ({ variant = 'neutral', children, dot = true }) => (
  <span className={clsx('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold', variantClasses[variant])}>
    {dot && <span className="text-[8px]">●</span>}
    {children}
  </span>
)

export const statusVariant = (status: string): Variant => {
  const map: Record<string, Variant> = {
    active: 'success', completed: 'success', paid: 'success', released: 'success',
    approved: 'success', resolved: 'success', accepted: 'success', verified: 'success',
    good: 'success', excellent: 'success', matured: 'info', guaranteed: 'success',
    pending: 'warning', 'in-review': 'warning', 'under-review': 'warning', partial: 'warning',
    new: 'info', disbursed: 'info', 'awaiting-approval': 'warning',
    rejected: 'danger', overdue: 'danger', failed: 'danger', suspended: 'danger',
    inactive: 'neutral', closed: 'neutral', fair: 'warning', poor: 'danger',
  }
  return map[status.toLowerCase().replace(/\s+/g, '-')] ?? 'neutral'
}
