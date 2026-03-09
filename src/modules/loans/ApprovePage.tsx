import React from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/formatters'

const pending = [
  { id: '1', dateApplied: '2024-12-01', member: 'Grace Kimani', memberId: 'MEM-00236', loanAmount: 800000, product: 'Normal Loan', tenure: 24, mandatoryShares: 100000, voluntaryShares: 50000, savings: 400000, deposits: 100000, other: 20000 },
  { id: '2', dateApplied: '2024-11-28', member: 'James Okoye', memberId: 'MEM-00241', loanAmount: 300000, product: 'Emergency Loan', tenure: 6, mandatoryShares: 50000, voluntaryShares: 0, savings: 200000, deposits: 0, other: 5000 },
]

export const ApprovePage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Loan Approval" subtitle="Review and approve pending loan applications" />

    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="font-bold text-gray-900 dark:text-white">Pending Applications</div>
        <span className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold px-2.5 py-1 rounded-full">{pending.length} pending</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {['Date Applied','Member','Loan Applied','Product','Tenure','Mand. Shares','Vol. Shares','Savings','Deposits','Other','Action'].map(h => (
                <th key={h} className="px-3 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pending.map(row => (
              <tr key={row.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{row.dateApplied}</td>
                <td className="px-3 py-3.5 border-b border-gray-100 dark:border-gray-800/50">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{row.member}</div>
                  <div className="text-xs text-gray-400">{row.memberId}</div>
                </td>
                <td className="px-3 py-3.5 text-sm font-mono font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(row.loanAmount)}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50">{row.product}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50">{row.tenure} mo.</td>
                {[row.mandatoryShares, row.voluntaryShares, row.savings, row.deposits, row.other].map((v, i) => (
                  <td key={i} className="px-3 py-3.5 text-sm font-mono text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(v)}</td>
                ))}
                <td className="px-3 py-3.5 border-b border-gray-100 dark:border-gray-800/50">
                  <div className="flex gap-1.5">
                    <Button variant="success" size="sm" onClick={() => toast.success(`Loan approved for ${row.member}`)}>✓</Button>
                    <Button variant="danger" size="sm" onClick={() => toast.error(`Loan rejected`)}>✗</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
