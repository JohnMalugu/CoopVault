import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ children, className, hover, onClick }) => (
  <div
    onClick={onClick}
    className={clsx(
      'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-card',
      hover && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200',
      className
    )}
  >
    {children}
  </div>
)

interface StatCardProps {
  icon: string
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  accent?: 'teal' | 'gold' | 'green' | 'blue' | 'purple'
  onClick?: () => void
}

const accentColors: Record<string, string> = {
  teal:   'from-primary-500 to-primary-400',
  gold:   'from-accent-500 to-accent-400',
  green:  'from-emerald-600 to-emerald-400',
  blue:   'from-blue-600 to-blue-400',
  purple: 'from-violet-600 to-violet-400',
}

export const StatCard: React.FC<StatCardProps> = ({
  icon, label, value, change, changeType = 'up', accent = 'teal', onClick
}) => (
  <div
    onClick={onClick}
    className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
  >
    <div className={clsx('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', accentColors[accent])} />
    <div className="text-2xl mb-2.5">{icon}</div>
    <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</div>
    <div className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">{value}</div>
    {change && (
      <div className={clsx('text-xs mt-1.5 font-semibold flex items-center gap-1',
        changeType === 'up' && 'text-emerald-600 dark:text-emerald-400',
        changeType === 'down' && 'text-red-500',
        changeType === 'neutral' && 'text-gray-400',
      )}>
        {change}
      </div>
    )}
  </div>
)
