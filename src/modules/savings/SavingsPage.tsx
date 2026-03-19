import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { FilterBar } from '@/components/ui/FilterBar'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockSavings } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { Calendar, Download, Plus, TrendingUp, Wallet } from 'lucide-react'

export const SavingsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="My Savings"
        subtitle="Track your savings contributions and interest"
        actions={
          <>
          <Button variant="secondary" size="sm" className="gap-2">
              <Download size={16} /> Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => toast.success('Opening new contribution form...')}>
              <Plus size={16} /> New Contribution
            </Button>
            <Button size="sm" icon="+" onClick={() => toast.success('Opening new contribution form...')}>
              New Contribution
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard 
          icon={Wallet} 
          label="Total Savings" 
          value="TZS 1.2M" 
          change="↑ 8.2% this month" 
          changeType="up" 
          accent="gold" 
        />
        <StatCard 
          icon={Calendar} 
          label="This Month" 
          value="TZS 50,000" 
          change="Regular contribution" 
          changeType="neutral" 
          accent="teal" 
        />
        <StatCard 
          icon={TrendingUp} 
          label="Interest Earned" 
          value="TZS 48,200" 
          change="6% p.a." 
          changeType="up" 
          accent="green" 
        />
      </div>

      <FilterBar
        filters={[
          { key: 'from', label: 'From Date', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To Date', type: 'date', value: toDate, onChange: setToDate },
          { key: 'cat', label: 'Category', type: 'select', value: category, onChange: setCategory,
            options: [
              { value: 'all', label: 'All Categories' },
              { value: 'regular', label: 'Regular Savings' },
              { value: 'target', label: 'Target Savings' },
              { value: 'emergency', label: 'Emergency Fund' },
            ]
          },
        ]}
        onFilter={() => toast.success('Filters applied')}
        onReset={() => { setFromDate('2024-01-01'); setToDate('2024-12-31'); setCategory('all') }}
      />

      <Table
        title="Savings History"
        data={mockSavings}
        currentPage={page}
        totalPages={2}
        total={mockSavings.length}
        pageSize={5}
        onPageChange={setPage}
        columns={[
          { key: 'idx', header: '#', render: (_, i) => <span className="text-gray-400 text-xs">{String((i as number) + 1).padStart(2, '0')}</span> },
          { key: 'date', header: 'Date', render: row => formatDate(row.date) },
          { key: 'amount', header: 'Amount', render: row => (
            <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(row.amount)}</span>
          )},
          { key: 'receiptNo', header: 'Receipt No.', render: row => <span className="font-semibold text-gray-900 dark:text-white">{row.receiptNo}</span> },
          { key: 'category', header: 'Category', render: row => <Badge variant="info">{row.category.name}</Badge> },
          { key: 'status', header: 'Status', render: row => <Badge variant={statusVariant(row.status)}>{row.status}</Badge> },
          { key: 'actions', header: 'Manage', render: () => (
            <div className="flex gap-1.5">
              <Button variant="secondary" size="sm" onClick={() => toast('Viewing details...')}>View</Button>
            </div>
          )},
        ]}
      />
    </div>
  )
}

// Patch table to accept index
declare module '@/components/ui/Table' {
  interface Column<T> {
    render?: (row: T, index?: number) => React.ReactNode
  }
}
