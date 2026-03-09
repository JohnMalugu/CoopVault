import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const baseInput = 'w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 text-sm font-sans outline-none transition-all duration-200 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary-500/10 placeholder:text-gray-400 dark:placeholder:text-gray-600'

export const Input: React.FC<InputProps> = ({ label, error, hint, className, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>}
    <input {...props} className={clsx(baseInput, error && 'border-red-400 focus:border-red-500', className)} />
    {hint && !error && <span className="text-xs text-gray-400">{hint}</span>}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)

export const Select: React.FC<SelectProps> = ({ label, error, options, className, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>}
    <select {...props} className={clsx(baseInput, 'cursor-pointer', error && 'border-red-400', className)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)

export const Textarea: React.FC<TextareaProps> = ({ label, error, className, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>}
    <textarea {...props} className={clsx(baseInput, 'resize-vertical min-h-[90px]', error && 'border-red-400', className)} />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)
