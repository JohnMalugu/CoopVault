import React from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockGuarantees } from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'

export const GuaranteePage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Loan Guarantee" subtitle="Loans you are guaranteeing for other members" />
    <Table
      title="Guarantee Requests"
      data={mockGuarantees}
      total={mockGuarantees.length}
      totalPages={1}
      columns={[
        { key: 'borrowerName', header: 'Member', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.borrowerName}</span> },
        { key: 'loanAmount', header: 'Loan Applied', render: r => <span className="font-mono font-semibold">{formatCurrency(r.loanAmount)}</span> },
        { key: 'product', header: 'Product', render: r => r.product },
        { key: 'tenure', header: 'Tenure', render: r => `${r.tenure} months` },
        { key: 'actions', header: 'Action', render: r => r.status === 'pending' ? (
          <div className="flex gap-1.5">
            <Button variant="success" size="sm" onClick={() => toast.success('Guarantee accepted!')}>✓ Accept</Button>
            <Button variant="danger" size="sm" onClick={() => toast.error('Guarantee declined')}>✗ Decline</Button>
          </div>
        ) : <Button variant="secondary" size="sm">View</Button> },
        { key: 'status', header: 'State', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
      ]}
    />
  </div>
)
