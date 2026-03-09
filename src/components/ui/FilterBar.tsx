import React from 'react'
import { Button } from './Button'
import { Input, Select } from './Input'

interface FilterBarProps {
  filters: FilterField[]
  onFilter?: () => void
  onReset?: () => void
}

interface FilterField {
  key: string
  label: string
  type: 'date' | 'select' | 'text'
  value: string
  onChange: (v: string) => void
  options?: { value: string; label: string }[]
  placeholder?: string
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilter, onReset }) => (
  <div className="flex flex-wrap gap-3 items-end bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-4 shadow-card">
    {filters.map(f => (
      <div key={f.key} className="flex-1 min-w-[140px]">
        {f.type === 'select' && f.options ? (
          <Select
            label={f.label}
            value={f.value}
            onChange={e => f.onChange(e.target.value)}
            options={f.options}
          />
        ) : (
          <Input
            label={f.label}
            type={f.type}
            value={f.value}
            onChange={e => f.onChange(e.target.value)}
            placeholder={f.placeholder}
          />
        )}
      </div>
    ))}
    <div className="flex gap-2 self-end">
      <Button variant="primary" size="sm" onClick={onFilter} icon="🔍">Filter</Button>
      {onReset && <Button variant="ghost" size="sm" onClick={onReset}>↺ Reset</Button>}
    </div>
  </div>
)
