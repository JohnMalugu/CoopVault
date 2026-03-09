import React from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockLoans, mockLoanProducts } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'

export const LoansPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="My Loans"
      subtitle="Manage your loan applications and repayments"
      actions={
        <>
          <Button variant="secondary" size="sm">📥 Export</Button>
          <Button size="sm" icon="+" onClick={() => toast.success('Opening loan application...')}>Apply New Loan</Button>
        </>
      }
    />

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <StatCard icon="💳" label="Active Loans" value="2" accent="blue" />
      <StatCard icon="💰" label="Pending Principal" value="TZS 800K" accent="gold" />
      <StatCard icon="📊" label="Pending Interest" value="TZS 48K" accent="teal" />
      <StatCard icon="⚠️" label="Penalties" value="TZS 0" accent="green" />
    </div>

    {/* Loan Products */}
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-gray-900 dark:text-white">Available Loan Products</div>
        <Button size="sm" onClick={() => toast.success('Opening application...')}>Apply Now</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockLoanProducts.map(p => (
          <div key={p.id} className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="font-bold text-gray-900 dark:text-white">{p.name}</div>
            <div className="text-xs text-gray-400 mt-1">{p.description}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {p.interestRate}% p.a.
              </span>
              <span className="text-xs text-gray-500">Max {p.maxTenure} months</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Loans Table */}
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-900 dark:text-white">
        Active Loans
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {['Product','Date Disbursed','Installments','Interest','Net Amount','Principal Repaid','Interest Repaid','Pending Principal','Pending Interest','Penalty','Stage','Options'].map(h => (
                <th key={h} className="px-3 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockLoans.map(loan => (
              <tr key={loan.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                <td className="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-100 dark:border-gray-800/50">{loan.loanProduct.name}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{loan.dateDisbursed ? formatDate(loan.dateDisbursed) : '—'}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50">{loan.installments}</td>
                <td className="px-3 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50">{loan.interestRate}%</td>
                <td className="px-3 py-3.5 text-sm font-mono font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(loan.netAmount)}</td>
                <td className="px-3 py-3.5 text-sm font-mono text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(loan.principalRepaid)}</td>
                <td className="px-3 py-3.5 text-sm font-mono text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(loan.interestRepaid)}</td>
                <td className="px-3 py-3.5 text-sm font-mono text-amber-600 dark:text-amber-400 font-semibold border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(loan.pendingPrincipal)}</td>
                <td className="px-3 py-3.5 text-sm font-mono text-amber-600 dark:text-amber-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatCurrency(loan.pendingInterest)}</td>
                <td className="px-3 py-3.5 text-sm font-mono border-b border-gray-100 dark:border-gray-800/50">{formatCurrency(loan.penalty)}</td>
                <td className="px-3 py-3.5 border-b border-gray-100 dark:border-gray-800/50">
                  <Badge variant={statusVariant(loan.status)}>{loan.stage}</Badge>
                </td>
                <td className="px-3 py-3.5 border-b border-gray-100 dark:border-gray-800/50">
                  <Button variant="secondary" size="sm" onClick={() => toast(`Loan ${loan.id} details`)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
