import React from 'react'
import { clsx } from 'clsx'

interface Step { label: string }

interface StepperProps {
  steps: Step[]
  current: number
  onStepClick?: (i: number) => void
}

export const Stepper: React.FC<StepperProps> = ({ steps, current, onStepClick }) => (
  <div className="flex items-center overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-4 mb-6 shadow-card gap-0">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <div
          className="flex items-center gap-2.5 cursor-pointer min-w-fit"
          onClick={() => onStepClick?.(i)}
        >
          <div className={clsx(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 flex-shrink-0',
            i < current && 'bg-emerald-500 border-emerald-500 text-white',
            i === current && 'bg-primary-500 border-primary-500 text-white',
            i > current && 'border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600',
          )}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={clsx(
            'text-xs font-semibold whitespace-nowrap transition-colors duration-200',
            i < current && 'text-emerald-600 dark:text-emerald-400',
            i === current && 'text-primary-600 dark:text-primary-400',
            i > current && 'text-gray-400 dark:text-gray-600',
          )}>
            {step.label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={clsx('flex-1 h-0.5 mx-3 min-w-[20px] transition-colors duration-200', i < current ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700')} />
        )}
      </React.Fragment>
    ))}
  </div>
)
