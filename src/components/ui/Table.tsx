import React from 'react'
import { clsx } from 'clsx'
import { Button } from './Button'

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
  headerClass?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  title?: string
  actions?: React.ReactNode
  loading?: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptyDesc?: string
  currentPage?: number
  totalPages?: number
  total?: number
  pageSize?: number
  onPageChange?: (page: number) => void
}

export function Table<T extends { id: string }>({
  columns, data, title, actions, loading,
  emptyIcon = '📭', emptyTitle = 'No records founds', emptyDesc = 'Try adjusting your filters.',
  currentPage = 1, totalPages = 1, total = 0, pageSize = 10, onPageChange
}: TableProps<T>) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
      {(title || actions) && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {title && <div className="font-bold text-gray-900 dark:text-white flex-1">{title}</div>}
          {actions}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={clsx(
                  'px-4 py-3 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider',
                  'bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 whitespace-nowrap',
                  col.headerClass
                )}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3.5 border-b border-gray-100 dark:border-gray-800/50">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="text-4xl mb-3 opacity-40">{emptyIcon}</div>
                  <div className="font-semibold text-gray-600 dark:text-gray-300">{emptyTitle}</div>
                  <div className="text-sm text-gray-400 mt-1">{emptyDesc}</div>
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors duration-150">
                  {columns.map(col => (
                    <td key={col.key} className={clsx(
                      'px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50',
                      col.className
                    )}>
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="flex items-center gap-1.5 px-5 py-3 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="ghost" size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
          >‹</Button>
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange?.(i + 1)}
              className={clsx(
                'w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-150',
                i + 1 === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              )}
            >{i + 1}</button>
          ))}
          <Button
            variant="ghost" size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
          >›</Button>
          <span className="ml-auto text-xs text-gray-400">
            {total > 0 ? `Showing ${start}–${end} of ${total.toLocaleString()}` : `${data.length} records`}
          </span>
        </div>
      )}
    </div>
  )
}
