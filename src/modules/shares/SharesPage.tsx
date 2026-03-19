import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { FilterBar } from '@/components/ui/FilterBar'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockShares } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { LineChart } from 'lucide-react'

export const SharesPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [category, setCategory] = useState('all')

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="My Shares"
        subtitle="Track your share portfolio and transactions"
        actions={
          <>
            <Button variant="secondary" size="sm">📥 Export</Button>
            <Button size="sm" onClick={() => toast.success('Opening share purchase form...')}>+ Buy Shares</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard icon={LineChart} label="Total Shares" value="TZS 450K" accent="teal" />
        <StatCard icon="🔢" label="Share Units" value="180" accent="gold" />
        <StatCard icon="💹" label="Unit Value" value="TZS 2,500" accent="green" />
        <StatCard icon="🏆" label="Dividend 2023" value="TZS 34,000" accent="blue" />
      </div>

      <FilterBar
        filters={[
          { key: 'from', label: 'From', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To', type: 'date', value: toDate, onChange: setToDate },
          { key: 'cat', label: 'Category', type: 'select', value: category, onChange: setCategory,
            options: [{ value: 'all', label: 'All' }, { value: 'ordinary', label: 'Ordinary' }, { value: 'preference', label: 'Preference' }]
          },
        ]}
        onFilter={() => toast.success('Filters applied')}
        onReset={() => {}}
      />

      <Table
        title="Share Transactions"
        data={mockShares}
        total={mockShares.length}
        totalPages={1}
        columns={[
          { key: 'n', header: '#', render: (_, i) => <span className="text-gray-400 text-xs">{(i as number) + 1}</span> },
          { key: 'date', header: 'Date', render: r => formatDate(r.date) },
          { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> },
          { key: 'units', header: 'Units', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.units}</span> },
          { key: 'receiptNo', header: 'Receipt', render: r => <span className="font-semibold">{r.receiptNo}</span> },
          { key: 'category', header: 'Category', render: r => <Badge variant="info">{r.category.name}</Badge> },
          { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
          { key: 'a', header: 'Manage', render: () => <Button variant="secondary" size="sm">View</Button> },
        ]}
      />
    </div>
  )
}
