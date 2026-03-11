import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { StatCard } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { ActivityChart } from '@/components/charts/ActivityChart'
import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { getGreeting, formatCurrency, formatDate } from '@/utils/formatters'
import { mockLedger } from '@/utils/mockData'
import { Calculator } from 'lucide-react'

const quickLinks = [
  { icon: Calculator, label: 'Loan Calculator', to: '/calculator', color: 'text-blue-500' },
  { icon: '📝', label: 'File Complaint', to: '/complaints' },
  { icon: '📥', label: 'Download Docs', to: '/documents' },
  { icon: '💸', label: 'Make Payment', to: '/payments' },
  { icon: '🤝', label: 'Loan Guarantee', to: '/guarantee' },
  { icon: '💼', label: 'View Fees', to: '/fees' },
]

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-700 to-primary-500 rounded-2xl p-7 mb-6 text-white">
        <div className="relative z-10">
          <div className="text-2xl font-extrabold tracking-tight">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </div>
          <div className="text-sm opacity-80 mt-1">Here's an overview of your SACCOS account</div>
          <div className="text-xs opacity-60 mt-3 flex items-center gap-2">📅 {today}</div>
        </div>
        <div className="absolute right-6 bottom-0 text-8xl opacity-10 select-none">🏦</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard icon="📈" label="Total Shares" value="TZS 450K" change="↑ 12.5% this month" changeType="up" accent="teal" onClick={() => navigate('/shares')} />
        <StatCard icon="💰" label="Total Savings" value="TZS 1.2M" change="↑ 8.2% this month" changeType="up" accent="gold" onClick={() => navigate('/savings')} />
        <StatCard icon="🏧" label="Deposits" value="TZS 320K" change="↑ 5.1% this month" changeType="up" accent="green" onClick={() => navigate('/deposits')} />
        <StatCard icon="💳" label="Pending Loans" value="TZS 800K" change="⟳ 2 active loans" changeType="neutral" accent="blue" onClick={() => navigate('/loans')} />
        <StatCard icon="🤲" label="Social Welfare" value="TZS 50K" change="● Active member" changeType="neutral" accent="purple" onClick={() => navigate('/contributions')} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-gray-900 dark:text-white">Financial Activity — 2024</div>
            <div className="flex gap-3">
              {[['#0a6e6e', 'Savings'], ['#c9921a', 'Loans']].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="h-52"><ActivityChart /></div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card">
          <div className="font-bold text-gray-900 dark:text-white mb-4">Portfolio Mix</div>
          <div className="h-52"><PortfolioChart /></div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {quickLinks.map(ql => (
          <div
            key={ql.label}
            onClick={() => navigate(ql.to)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 shadow-card"
          >
            <div className="text-2xl mb-2">{ql.icon}</div>
            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400">{ql.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="font-bold text-gray-900 dark:text-white">Recent Transactions</div>
          <button
            onClick={() => navigate('/ledger')}
            className="text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                {['#', 'Date', 'Type', 'Description', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLedger.slice(0, 5).map((row, i) => (
                <tr key={row.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3.5 text-sm text-gray-400 border-b border-gray-100 dark:border-gray-800/50">{String(i + 1).padStart(3, '0')}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/50 whitespace-nowrap">{formatDate(row.date)}</td>
                  <td className="px-4 py-3.5 text-sm border-b border-gray-100 dark:border-gray-800/50"><Badge variant="info">{row.type}</Badge></td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800/50">{row.description}</td>
                  <td className="px-4 py-3.5 text-sm font-mono font-semibold border-b border-gray-100 dark:border-gray-800/50">
                    <span className={row.credit ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>
                      {row.credit ? `+${formatCurrency(row.credit)}` : `-${formatCurrency(row.debit ?? 0)}`}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm border-b border-gray-100 dark:border-gray-800/50">
                    <Badge variant={statusVariant('completed')}>Completed</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
