import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => (
  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap animate-fade-in">
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex gap-2 items-center flex-wrap">{actions}</div>}
  </div>
)
