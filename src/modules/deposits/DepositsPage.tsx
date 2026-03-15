import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { 
  Landmark, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  Wallet, 
  Plus,
  Eye
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { FilterBar } from '@/components/ui/FilterBar'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockDeposits } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'

export const DepositsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [category, setCategory] = useState('all')

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="My Deposits"
        subtitle="Manage your fixed and recurring deposits"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Download size={16} /> Export
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2 text-amber-600 border-amber-200 hover:bg-amber-50"
              onClick={() => toast.success('Withdrawal request submitted!')}
            >
              <Wallet size={16} /> Withdraw
            </Button>
            <Button size="sm" className="gap-2">
              <Plus size={16} /> New Deposit
            </Button>
          </div>
        }
      />

      {/* Stats Section with Lucide Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard 
          icon={Landmark} 
          label="Total Deposits" 
          value="TZS 220K" 
          accent="blue" 
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Active Deposits" 
          value="2" 
          accent="teal" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Interest Earned" 
          value="TZS 18,500" 
          accent="gold" 
        />
      </div>

      <FilterBar
        filters={[
          { key: 'from', label: 'From Date', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To Date', type: 'date', value: toDate, onChange: setToDate },
          { key: 'cat', label: 'Category', type: 'select', value: category, onChange: setCategory,
            options: [
              { value: 'all', label: 'All' }, 
              { value: 'fixed', label: 'Fixed Deposit' }, 
              { value: 'recurring', label: 'Recurring Deposit' }
            ]
          },
        ]}
        onFilter={() => toast.success('Filters applied')}
        onReset={() => { setFromDate('2024-01-01'); setToDate('2024-12-31'); setCategory('all') }}
      />

      <Table
        title="Deposit History"
        data={mockDeposits}
        total={mockDeposits.length}
        totalPages={1}
        columns={[
          { 
            key: 'n', 
            header: '#', 
            render: (_, i) => <span className="text-gray-400 font-mono text-xs">{(i as number) + 1}</span> 
          },
          { 
            key: 'date', 
            header: 'Date', 
            render: r => <span className="text-gray-600 dark:text-gray-400">{formatDate(r.date)}</span> 
          },
          { 
            key: 'amount', 
            header: 'Amount', 
            render: r => <span className="font-mono font-bold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> 
          },
          { 
            key: 'receiptNo', 
            header: 'Receipt', 
            render: r => <span className="font-medium text-primary-600 dark:text-primary-400">#{r.receiptNo}</span> 
          },
          { 
            key: 'category', 
            header: 'Category', 
            render: r => (
              <Badge variant="outline" className="capitalize">
                {r.category === 'fixed' ? 'Fixed' : 'Recurring'}
              </Badge>
            ) 
          },
          { 
            key: 'maturityDate', 
            header: 'Maturity', 
            render: r => r.maturityDate ? formatDate(r.maturityDate) : <span className="text-gray-400 italic">Ongoing</span> 
          },
          { 
            key: 'interestEarned', 
            header: 'Interest', 
            render: r => <span className="font-mono font-bold text-emerald-600">+{formatCurrency(r.interestEarned)}</span> 
          },
          { 
            key: 'status', 
            header: 'Status', 
            render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> 
          },
          { 
            key: 'a', 
            header: 'Manage', 
            render: () => (
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <Eye size={14} />
              </Button>
            ) 
          },
        ]}
      />
    </div>
  )
}