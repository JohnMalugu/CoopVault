// ─── Complaints ─────────────────────────────────────────────────────────────
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table } from '@/components/ui/Table'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { mockComplaints, mockFees, mockFundReleases, mockDocuments, mockLedger, mockPayments, mockPenalties, mockBudget, mockAssets } from '@/utils/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { StatCard } from '@/components/ui/Card'
import { AccountingChart } from '@/components/charts/AccountingChart'
import { FilterBar } from '@/components/ui/FilterBar'
import { BarChart3, CheckCircle2, DollarSign } from 'lucide-react'

export const ComplaintsPage: React.FC = () => {
  const [subject, setSubject] = useState('')
  const [desc, setDesc] = useState('')
  const [type, setType] = useState('complaint')
  const [priority, setPriority] = useState('normal')

  return (
    <div className="animate-fade-in">
      <PageHeader title="Complaints & Suggestions" subtitle="Submit your concerns and feedback" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="font-bold text-gray-900 dark:text-white">📝 New Submission</div>
          </div>
          <div className="p-6 space-y-4">
            <Select label="Type" value={type} onChange={e => setType(e.target.value)}
              options={[{value:'complaint',label:'Complaint'},{value:'suggestion',label:'Suggestion'},{value:'inquiry',label:'Inquiry'}]} />
            <Input label="Subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief subject line" />
            <Textarea label="Description" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe in detail..." />
            <Select label="Priority" value={priority} onChange={e => setPriority(e.target.value)}
              options={[{value:'normal',label:'Normal'},{value:'high',label:'High'},{value:'urgent',label:'Urgent'}]} />
            <Button onClick={() => { toast.success('Submitted! Ref: CMP-2024-089'); setSubject(''); setDesc('') }}>Submit →</Button>
          </div>
        </div>
        <Table
          title="My Submissions"
          data={mockComplaints}
          total={mockComplaints.length}
          totalPages={1}
          columns={[
            { key: 'refNo', header: 'Ref', render: r => <span className="font-bold text-primary-600 dark:text-primary-400">{r.refNo}</span> },
            { key: 'subject', header: 'Subject', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.subject}</span> },
            { key: 'dateSubmitted', header: 'Date', render: r => formatDate(r.dateSubmitted) },
            { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status.replace('-', ' ')}</Badge> },
          ]}
        />
      </div>
    </div>
  )
}

export const FeesPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Fees & Charges" subtitle="Overview of your applicable fees" />
    <Table
      title="Fee Schedule"
      data={mockFees}
      total={mockFees.length}
      totalPages={1}
      columns={[
        { key: 'name', header: 'Fee', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.name}</span> },
        { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold">{formatCurrency(r.amount)}</span> },
        { key: 'paid', header: 'Paid', render: r => <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(r.paid)}</span> },
        { key: 'balance', header: 'Balance', render: r => <span className={`font-mono font-semibold ${r.balance > 0 ? 'text-red-500' : 'text-emerald-600'}`}>{formatCurrency(r.balance)}</span> },
        { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
      ]}
    />
  </div>
)

export const FundReleasePage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Fund Release" subtitle="Track fund disbursements and approvals" />
    <Table
      title="Fund Release Requests"
      data={mockFundReleases}
      total={mockFundReleases.length}
      totalPages={1}
      columns={[
        { key: 'beneficiary', header: 'Beneficiary', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.beneficiary}</span> },
        { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold">{formatCurrency(r.amount)}</span> },
        { key: 'category', header: 'Category' },
        { key: 'approvedBy', header: 'Approved By' },
        { key: 'dateApproved', header: 'Date Approved', render: r => r.dateApproved ? formatDate(r.dateApproved) : '—' },
        { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
        { key: 'signatories', header: 'Signatories', render: r => `${r.signatories.signed}/${r.signatories.total}` },
      ]}
    />
  </div>
)

export const DocumentsPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Reference Documents" subtitle="Download SACCOS forms and reference materials" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockDocuments.map(doc => (
        <div key={doc.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card flex items-center gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
          <div className="text-3xl">{doc.type === 'excel' ? '📊' : doc.type === 'word' ? '📝' : '📄'}</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{doc.title}</div>
            <div className="text-xs text-gray-400 mt-0.5">{doc.type.toUpperCase()} · {doc.size} · {formatDate(doc.updatedAt)}</div>
            <Badge variant="neutral" dot={false}>{doc.category}</Badge>
          </div>
          <Button variant="primary" size="sm" onClick={() => toast.success(`Downloading ${doc.title}...`)}>⬇</Button>
        </div>
      ))}
    </div>
  </div>
)
//work on buttons
export const LedgerPage: React.FC = () => {
  const [fromDate, setFromDate] = useState('2024-01-01')
  const [toDate, setToDate] = useState('2024-12-31')
  const [type, setType] = useState('all')

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Financial Ledger"
        subtitle="Complete record of all financial transactions"
        actions={
          <>
            <Button variant="secondary" size="sm">📄s Export PDF</Button>
            <Button variant="secondary" size="sm">📊 {} as Export Excel</Button>
          </>
        }
      />
      <FilterBar
        filters={[
          { key: 'from', label: 'From Date', type: 'date', value: fromDate, onChange: setFromDate },
          { key: 'to', label: 'To Date', type: 'date', value: toDate, onChange: setToDate },
          { key: 'type', label: 'Type', type: 'select', value: type, onChange: setType,
            options: [{value:'all',label:'All Types'},{value:'savings',label:'Savings'},{value:'deposits',label:'Deposits'},{value:'shares',label:'Shares'},{value:'loans',label:'Loans'}]
          },
        ]}
        onFilter={() => toast.success('Filters applied')}
        onReset={() => { setFromDate('2024-01-01'); setToDate('2024-12-31'); setType('all') }}
      />
      <Table
        title="Ledger Entries"
        data={mockLedger}
        total={48}
        totalPages={5}
        currentPage={1}
        columns={[
          { key: 'n', header: '#', render: (_, i) => <span className="text-gray-400 text-xs">{String((i as number)+1).padStart(3,'0')}</span> },
          { key: 'date', header: 'Date', render: r => formatDate(r.date) },
          { key: 'type', header: 'Type', render: r => <Badge variant="info">{r.type}</Badge> },
          { key: 'description', header: 'Description', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.description}</span> },
          { key: 'debit', header: 'Debit', render: r => r.debit ? <span className="font-mono text-red-500">-{formatCurrency(r.debit)}</span> : <span className="text-gray-300">—</span> },
          { key: 'credit', header: 'Credit', render: r => r.credit ? <span className="font-mono text-emerald-600">+{formatCurrency(r.credit)}</span> : <span className="text-gray-300">—</span> },
          { key: 'balance', header: 'Balance', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.balance)}</span> },
          { key: 'receiptNo', header: 'Receipt', render: r => <span className="font-semibold text-xs">{r.receiptNo}</span> },
        ]}
      />
    </div>
  )
}

export const PaymentsPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader
      title="Payment Submissions"
      subtitle="Track all your payment submissions"
      actions={<Button size="sm" icon="+" onClick={() => toast.success('Opening payment form...')}>New Payment</Button>}
    />
    <Table
      title="Payment History"
      data={mockPayments}
      total={mockPayments.length}
      totalPages={1}
      columns={[
        { key: 'date', header: 'Date', render: r => formatDate(r.date) },
        { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> },
        { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
        { key: 'receiptNo', header: 'Receipt', render: r => <span className="font-semibold">{r.receiptNo}</span> },
        { key: 'a', header: 'Action', render: () => <Button variant="secondary" size="sm">Download</Button> },
      ]}
    />
  </div>
)

export const PenaltiesPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Loan Penalties" subtitle="Track late payment penalties on your loans" />
    <Table
      title="Penalty Records"
      data={mockPenalties}
      total={0}
      totalPages={0}
      emptyIcon="🎉"
      emptyTitle="No penalties!"
      emptyDesc="You have no late payment penalties. Keep it up!"
      columns={[
        { key: 'date', header: 'Date' },
        { key: 'loanId', header: 'Loan' },
        { key: 'penaltyType', header: 'Penalty Type' },
        { key: 'daysDelayed', header: 'Days Delayed' },
        { key: 'amountRecovered', header: 'Amount Recovered' },
        { key: 'pendingAmount', header: 'Pending' },
        { key: 'status', header: 'Status' },
      ]}
    />
  </div>
)

export const BudgetPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Budget & Planning" subtitle="Manage organizational budget allocation" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <StatCard icon={BarChart3} label="Annual Budget" value="TZS 450M" accent="teal" />
      <StatCard icon={DollarSign} label="Spent YTD" value="TZS 312M" accent="gold" />
      <StatCard icon={CheckCircle2} label="Remaining" value="TZS 138M" accent="green" />
    </div>
    <Table
      title="Budget by Department"
      data={mockBudget}
      total={mockBudget.length}
      totalPages={1}
      columns={[
        { key: 'department', header: 'Department', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.department}</span> },
        { key: 'allocated', header: 'Allocated (TZS M)', render: r => <span className="font-mono">{r.allocated}M</span> },
        { key: 'spent', header: 'Spent (TZS M)', render: r => <span className="font-mono text-amber-600">{r.spent}M</span> },
        { key: 'remaining', header: 'Remaining', render: r => <span className="font-mono text-emerald-600">{r.remaining}M</span> },
        { key: 'percentage', header: 'Utilization', render: r => (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden" style={{minWidth: 80}}>
              <div className="h-full rounded-full bg-primary-500" style={{width: `${r.percentage}%`}} />
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{r.percentage}%</span>
          </div>
        )},
      ]}
    />
  </div>
)

export const ExpensesPage: React.FC = () => {
  const expenses = [
    { id: '1', date: '2024-12-01', category: 'Operations', description: 'Office Supplies', amount: 450000, approvedBy: 'Director', status: 'approved' },
    { id: '2', date: '2024-11-28', category: 'IT', description: 'Software License', amount: 1200000, approvedBy: 'Director', status: 'approved' },
    { id: '3', date: '2024-11-20', category: 'Training', description: 'Staff Training Workshop', amount: 800000, approvedBy: '—', status: 'pending' },
  ]
  return (
    <div className="animate-fade-in">
      <PageHeader title="Expenses" subtitle="Track organizational expenditures"
        actions={<Button size="sm" onClick={() => toast.success('Opening expense form')}>+ Add Expense</Button>}
      />
      <Table
        title="Expense Records"
        data={expenses}
        total={expenses.length}
        totalPages={1}
        columns={[
          { key: 'date', header: 'Date', render: r => formatDate(r.date) },
          { key: 'category', header: 'Category', render: r => <Badge variant="info">{r.category}</Badge> },
          { key: 'description', header: 'Description', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.description}</span> },
          { key: 'amount', header: 'Amount', render: r => <span className="font-mono font-semibold">{formatCurrency(r.amount)}</span> },
          { key: 'approvedBy', header: 'Approved By' },
          { key: 'status', header: 'Status', render: r => <Badge variant={statusVariant(r.status)}>{r.status}</Badge> },
        ]}
      />
    </div>
  )
}

export const AssetsPage: React.FC = () => (
  <div className="animate-fade-in">
    <PageHeader title="Asset Management" subtitle="Track organizational assets"
      actions={<Button size="sm">+ Add Asset</Button>}
    />
    <Table
      title="Asset Register"
      data={mockAssets}
      total={mockAssets.length}
      totalPages={1}
      columns={[
        { key: 'assetId', header: 'Asset ID', render: r => <span className="font-bold text-primary-600 dark:text-primary-400">{r.assetId}</span> },
        { key: 'name', header: 'Name', render: r => <span className="font-semibold text-gray-900 dark:text-white">{r.name}</span> },
        { key: 'category', header: 'Category', render: r => <Badge variant="info">{r.category}</Badge> },
        { key: 'purchaseDate', header: 'Purchase Date', render: r => formatDate(r.purchaseDate) },
        { key: 'purchaseValue', header: 'Purchase Value', render: r => <span className="font-mono">{formatCurrency(r.purchaseValue)}</span> },
        { key: 'currentValue', header: 'Current Value', render: r => <span className="font-mono font-semibold text-gray-900 dark:text-white">{formatCurrency(r.currentValue)}</span> },
        { key: 'condition', header: 'Condition', render: r => <Badge variant={statusVariant(r.condition)}>{r.condition}</Badge> },
        { key: 'location', header: 'Location' },
      ]}
    />
  </div>
)

export const AccountingPage: React.FC = () => (
  //za leo
  <div className="animate-fade-in">
    <PageHeader title="Accounting" subtitle="Financial reports and accounting integration" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <StatCard icon="📈" label="Total Assets" value="TZS 2.8B" accent="teal" />
      <StatCard icon="💳" label="Total Liabilities" value="TZS 1.9B" accent="gold" />
      <StatCard icon="💰" label="Net Worth" value="TZS 900M" accent="green" />
      <StatCard icon="📊" label="Revenue YTD" value="TZS 320M" accent="blue" />
    </div>
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card">
      <div className="font-bold text-gray-900 dark:text-white mb-4">Income vs Expenses — Monthly 2024</div>
      <div className="h-64"><AccountingChart /></div>
    </div>
  </div>
)
