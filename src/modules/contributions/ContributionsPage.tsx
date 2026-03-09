import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterBar } from '@/components/ui/FilterBar'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockContributions } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'

export const ContributionsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [category, setCategory] = useState('all')

  return (
    <div className="animate-fade-in">
      <PageHeader title="Other Contributions" subtitle="Social welfare and other member contributions" />
      <FilterBar
        filters={[
          { key: 'from', label: 'From', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To', type: 'date', value: toDate, onChange: setToDate },
          { key: 'cat', label: 'Category', type: 'select', value: category, onChange: setCategory,
            options: [{ value: 'all', label: 'All' }, { value: 'welfare', label: 'Social Welfare' }, { value: 'benevolent', label: 'Benevolent Fund' }, { value: 'education', label: 'Education Fund' }]
          },
        ]}
        onFilter={() => toast.success('Filtered')}
        onReset={() => {}}
      />
      <Table
        data={mockContributions}
        total={mockContributions.length}
        totalPages={1}
        columns={[
          { key: 'date', header: 'Date', render: r => formatDate(r.date) },
          { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> },
          { key: 'receiptNo', header: 'Receipt', render: r => <span className="font-semibold">{r.receiptNo}</span> },
          { key: 'category', header: 'Category', render: r => <Badge variant="neutral">{r.category}</Badge> },
          { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
          { key: 'a', header: 'Manage', render: () => <Button variant="secondary" size="sm">View</Button> },
        ]}
      />
    </div>
  )
}
