import React, { useState } from 'react'
import toast from 'react-hot-toast'
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
    <div className="animate-fade-in">
      <PageHeader
        title="My Deposits"
        subtitle="Manage your fixed and recurring deposits"
        actions={
          <>
            <Button variant="secondary" size="sm">📥 Export</Button>
            <Button variant="accent" size="sm" onClick={() => toast.success('Withdrawal request submitted!')}>💸 Withdraw</Button>
            <Button size="sm">+ New Deposit</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard icon="🏧" label="Total Deposits" value="TZS 320K" accent="blue" />
        <StatCard icon="✅" label="Active Deposits" value="3" accent="teal" />
        <StatCard icon="📈" label="Interest Earned" value="TZS 18,500" accent="gold" />
      </div>

      <FilterBar
        filters={[
          { key: 'from', label: 'From Date', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To Date', type: 'date', value: toDate, onChange: setToDate },
          { key: 'cat', label: 'Category', type: 'select', value: category, onChange: setCategory,
            options: [{ value: 'all', label: 'All' }, { value: 'fixed', label: 'Fixed Deposit' }, { value: 'recurring', label: 'Recurring Deposit' }]
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
          { key: 'n', header: '#', render: (_, i) => <span className="text-gray-400 text-xs">{(i as number) + 1}</span> },
          { key: 'date', header: 'Date', render: r => formatDate(r.date) },
          { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> },
          { key: 'receiptNo', header: 'Receipt', render: r => <span className="font-semibold">{r.receiptNo}</span> },
          { key: 'category', header: 'Category', render: r => <Badge variant="info">{r.category === 'fixed' ? 'Fixed Deposit' : 'Recurring'}</Badge> },
          { key: 'maturityDate', header: 'Maturity', render: r => r.maturityDate ? formatDate(r.maturityDate) : 'Ongoing' },
          { key: 'interestEarned', header: 'Interest Earned', render: r => <span className="font-mono text-emerald-600">{formatCurrency(r.interestEarned)}</span> },
          { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
          { key: 'a', header: 'Manage', render: () => <Button variant="secondary" size="sm">View</Button> },
        ]}
      />
    </div>
  )
}
