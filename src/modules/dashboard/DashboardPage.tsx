import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  Wallet, 
  Landmark, 
  CreditCard, 
  HeartHandshake, 
  Calculator, 
  MessageSquareText, 
  FileDown, 
  Banknote, 
  Handshake, 
  Briefcase,
  Calendar,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { StatCard } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { ActivityChart } from '@/components/charts/ActivityChart'
import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { getGreeting, formatCurrency, formatDate } from '@/utils/formatters'
import { mockLedger } from '@/utils/mockData'

const quickLinks = [
  { icon: Calculator, label: 'Loan Calculator', to: '/calculator', color: 'text-blue-500' },
  { icon: MessageSquareText, label: 'File Complaint', to: '/complaints', color: 'text-purple-500' },
  { icon: FileDown, label: 'Download Docs', to: '/documents', color: 'text-emerald-500' },
  { icon: Banknote, label: 'Make Payment', to: '/payments', color: 'text-amber-500' },
  { icon: Handshake, label: 'Loan Guarantee', to: '/guarantee', color: 'text-indigo-500' },
  { icon: Briefcase, label: 'View Fees', to: '/fees', color: 'text-rose-500' },
]

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="animate-fade-in space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 rounded-3xl p-8 text-white shadow-xl shadow-primary-900/20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles size={12} className="text-amber-300" /> Member Portal
          </div>
          <div className="text-3xl font-black tracking-tight mb-1">
            {getGreeting()}, {user?.name?.split(' ')[0]}!
          </div>
          <p className="text-primary-100/80 text-sm font-medium">Your SACCOS portfolio is looking healthy today.</p>
          
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <Calendar size={14} className="text-primary-300" /> {today}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <Clock size={14} className="text-primary-300" /> Last login: 2h ago
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <Landmark size={240} className="absolute -right-12 -bottom-12 opacity-10 rotate-12" strokeWidth={1} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={TrendingUp} label="Total Shares" value="TZS 450K" change="↑ 12.5%" changeType="up" accent="teal" onClick={() => navigate('/shares')} />
        <StatCard icon={Wallet} label="Total Savings" value="TZS 1.2M" change="↑ 8.2%" changeType="up" accent="gold" onClick={() => navigate('/savings')} />
        <StatCard icon={Landmark} label="Deposits" value="TZS 320K" change="↑ 5.1%" changeType="up" accent="green" onClick={() => navigate('/deposits')} />
        <StatCard icon={CreditCard} label="Pending Loans" value="TZS 800K" change="2 active" changeType="neutral" accent="blue" onClick={() => navigate('/loans')} />
        <StatCard icon={HeartHandshake} label="Social Welfare" value="TZS 50K" change="Active" changeType="neutral" accent="purple" onClick={() => navigate('/contributions')} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Financial Activity <span className="text-xs font-normal text-gray-400">— 2026</span>
            </h3>
            <div className="flex gap-4">
              {[['bg-primary-500', 'Savings'], ['bg-amber-500', 'Loans']].map(([bg, l]) => (
                <span key={l} className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span className={`w-2 h-2 rounded-full ${bg}`} />
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="h-64"><ActivityChart /></div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Portfolio Mix</h3>
          <div className="h-64"><PortfolioChart /></div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map(ql => (
          <button
            key={ql.label}
            onClick={() => navigate(ql.to)}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-left hover:border-primary-500 transition-all hover:shadow-lg hover:shadow-primary-500/5"
          >
            <div className={`p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 w-fit mb-4 group-hover:scale-110 transition-transform ${ql.color}`}>
              <ql.icon size={22} />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{ql.label}</div>
            <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ArrowRight size={10} />
            </div>
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Recent Transactions
          </h3>
          <button
            onClick={() => navigate('/ledger')}
            className="group flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest hover:text-primary-700"
          >
            Full Statement <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                {['ID', 'Date', 'Category', 'Description', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockLedger.slice(0, 5).map((row, i) => (
                <tr key={row.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">#{String(i + 1).padStart(3, '0')}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{formatDate(row.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge variant="outline" className="capitalize">{row.type}</Badge></td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{row.description}</td>
                  <td className="px-6 py-4 text-sm font-mono font-bold">
                    <span className={row.credit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}>
                      {row.credit ? `+${formatCurrency(row.credit)}` : `-${formatCurrency(row.debit ?? 0)}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Success
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
}