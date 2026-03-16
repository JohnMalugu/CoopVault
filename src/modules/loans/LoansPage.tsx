import React from 'react'
import toast from 'react-hot-toast'
import { 
  CreditCard, 
  Coins, 
  BarChart3, 
  AlertCircle, 
  Download, 
  Plus, 
  ArrowRight,
  Info
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockLoans, mockLoanProducts } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'

export const LoansPage: React.FC = () => (
  <div className="animate-fade-in space-y-6">
    <PageHeader
      title="My Loans"
      subtitle="Manage your loan applications and repayments"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-2">
            <Download size={16} /> Export
          </Button>
          <Button size="sm" className="gap-2" onClick={() => toast.success('Opening loan application...')}>
            <Plus size={16} /> Apply New Loan
          </Button>
        </div>
      }
    />

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard icon={CreditCard} label="Active Loans" value="2" accent="blue" />
      <StatCard icon={Coins} label="Pending Principal" value="TZS 800K" accent="gold" />
      <StatCard icon={BarChart3} label="Pending Interest" value="TZS 48K" accent="teal" />
      <StatCard icon={AlertCircle} label="Penalties" value="TZS 0" accent="green" />
    </div>

    {/* Loan Products */}
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Available Loan Products</h3>
          <p className="text-xs text-gray-500 mt-0.5">Choose a product that fits your financial needs</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => toast.success('Viewing all products...')}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockLoanProducts.map((p: any) => (
          <div key={p.id} className="group bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary-500/50 transition-all">
            <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{p.name}</div>
            <div className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{p.description}</div>
            
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interest</div>
                <div className="text-sm font-black text-primary-600 dark:text-primary-400">{p.interestRate}% p.a.</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tenure</div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">{p.maxTenure} Months</div>
              </div>
            </div>
            
            <button 
              onClick={() => toast.success(`Applying for ${p.name}`)}
              className="w-full mt-4 py-2 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Loans Table */}
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-900 dark:text-white">
        Active Loan Portfolio
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
              {[
                'Product','Disbursed','Installments','Rate','Net Amount',
                'Principal Paid','Interest Paid','Balance Principal','Balance Interest','Penalty','Status',''
              ].map(h => (
                <th key={h} className="px-4 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockLoans.map((loan: any) => (
              <tr key={loan.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  {loan.loanProduct.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
                  {loan.dateDisbursed ? formatDate(loan.dateDisbursed) : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                  {loan.installments}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {loan.interestRate}%
                </td>
                <td className="px-4 py-4 text-sm font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  {formatCurrency(loan.netAmount)}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-emerald-600 font-medium whitespace-nowrap">
                  {formatCurrency(loan.principalRepaid)}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-emerald-600 font-medium whitespace-nowrap">
                  {formatCurrency(loan.interestRepaid)}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-amber-600 font-bold whitespace-nowrap">
                  {formatCurrency(loan.pendingPrincipal)}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-amber-600 whitespace-nowrap">
                  {formatCurrency(loan.pendingInterest)}
                </td>
                <td className="px-4 py-4 text-sm font-mono text-red-500 whitespace-nowrap">
                  {formatCurrency(loan.penalty)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={statusVariant(loan.status)}>{loan.stage}</Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => toast(`Loan ${loan.id} details`)}
                  >
                    <Info size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)