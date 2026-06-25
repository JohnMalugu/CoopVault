import React from 'react'
import { clsx } from 'clsx'
import { LucideIcon } from 'lucide-react'

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
      'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm',
      hover && 'cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300',
      className
    )}
  >
    {children}
  </div>
)

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  accent?: 'teal' | 'gold' | 'green' | 'blue' | 'purple'
  onClick?: () => void
}

const accentConfig: Record<string, { gradient: string; iconBg: string; iconText: string }> = {
  teal: { 
    gradient: 'from-primary-500 to-primary-400', 
    iconBg: 'bg-primary-50 dark:bg-primary-500/10', 
    iconText: 'text-primary-600 dark:text-primary-400' 
  },
  gold: { 
    gradient: 'from-accent-500 to-accent-400', 
    iconBg: 'bg-accent-50 dark:bg-accent-500/10', 
    iconText: 'text-accent-600 dark:text-accent-400' 
  },
  green: { 
    gradient: 'from-emerald-600 to-emerald-400', 
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', 
    iconText: 'text-emerald-600 dark:text-emerald-400' 
  },
  blue: { 
    gradient: 'from-blue-600 to-blue-400', 
    iconBg: 'bg-blue-50 dark:bg-blue-500/10', 
    iconText: 'text-blue-600 dark:text-blue-400' 
  },
  purple: { 
    gradient: 'from-violet-600 to-violet-400', 
    iconBg: 'bg-violet-50 dark:bg-violet-500/10', 
    iconText: 'text-violet-600 dark:text-violet-400' 
  },
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon, label, value, change, changeType = 'up', accent = 'teal', onClick
}) => {
  const config = accentConfig[accent]

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top Accent Line */}
      <div className={clsx('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', config.gradient)} />
      
      {/* Icon Wrapper */}
      <div className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300',
        config.iconBg,
        config.iconText
      )}>
        <Icon size={20} strokeWidth={2.5} />
      </div>

      <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</div>
      <div className="text-xl font-black text-gray-900 dark:text-white tracking-tight mt-1">{value}</div>
      
      {change && (
        <div className={clsx('text-[11px] mt-2 font-bold flex items-center gap-1',
          changeType === 'up' && 'text-emerald-600 dark:text-emerald-400',
          changeType === 'down' && 'text-red-500',
          changeType === 'neutral' && 'text-gray-400',
        )}>
          {change}
        </div>
      )}

      {/* Subtle Background Decoration */}
      <Icon 
        size={80} 
        className="absolute -right-4 -bottom-4 text-gray-100 dark:text-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 pointer-events-none" 
      />
    </div>
  )
}