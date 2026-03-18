import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/Card'
import { FilterBar } from '@/components/ui/FilterBar'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockMembers } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { Users } from 'lucide-react'

export const MembersPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = mockMembers.filter(m =>
    (status === 'all' || m.status === status) &&
    (!search || `${m.firstName} ${m.lastName} ${m.memberId}`.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Member Management"
        subtitle="Register and manage SACCOS members"
        actions={
          <>
            <Button variant="secondary" size="sm">📥 Export</Button>
            <Button size="sm" icon="+" onClick={() => toast.success('Opening registration form...')}>Register Member</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard icon={Users} label="Total Members" value="1,248" accent="teal" />
        <StatCard icon="✅" label="Active" value="1,194" accent="green" />
        <StatCard icon="🆕" label="New This Month" value="23" accent="gold" />
        <StatCard icon="⏸️" label="Inactive" value="54" accent="blue" />
      </div>

      <FilterBar
        filters={[
          { key: 'search', label: 'Search', type: 'text', value: search, onChange: setSearch, placeholder: 'Name, ID, phone...' },
          { key: 'status', label: 'Status', type: 'select', value: status, onChange: setStatus,
            options: [{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]
          },
        ]}
        onReset={() => { setSearch(''); setStatus('all') }}
      />

      <Table
        title="Members List"
        data={filtered}
        total={1248}
        totalPages={250}
        currentPage={1}
        pageSize={5}
        columns={[
          { key: 'memberId', header: 'ID', render: r => <span className="font-bold text-primary-600 dark:text-primary-400">{r.memberId}</span> },
          { key: 'name', header: 'Name', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.firstName} {r.lastName}</span> },
          { key: 'phone', header: 'Phone', render: r => r.phone },
          { key: 'joinDate', header: 'Join Date', render: r => formatDate(r.joinDate) },
          { key: 'totalSavings', header: 'Savings', render: r => <span className="font-mono">{formatCurrency(r.totalSavings ?? 0)}</span> },
          { key: 'totalLoans', header: 'Loans', render: r => <span className="font-mono">{formatCurrency(r.totalLoans ?? 0)}</span> },
          { key: 'totalShares', header: 'Shares', render: r => <span className="font-mono">{formatCurrency(r.totalShares ?? 0)}</span> },
          { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
          { key: 'a', header: 'Actions', render: r => (
            <div className="flex gap-1.5">
              <Button variant="secondary" size="sm" onClick={() => toast(`Viewing ${r.firstName}`)}>View</Button>
              <Button variant="ghost" size="sm" onClick={() => toast(`Editing ${r.firstName}`)}>Edit</Button>
            </div>
          )},
        ]}
      />
    </div>
  )
}
