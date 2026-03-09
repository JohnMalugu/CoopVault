import type {
  SavingsTransaction, DepositAccount, ShareTransaction,
  Loan, LoanProduct, LoanGuarantee, LoanPenalty,
  Fee, FundRelease, Complaint, Document,
  BudgetItem, Asset, LedgerEntry, Payment, Contribution, Member
} from '@/types'

// ─── Savings ─────────────────────────────────────────────────────────────────
export const mockSavings: SavingsTransaction[] = [
  { id: '1', memberId: '1', date: '2024-12-01', amount: 50000, receiptNo: 'RCP-20241201', category: { id: '1', name: 'Regular Savings', interestRate: 6 }, type: 'deposit', status: 'completed' },
  { id: '2', memberId: '1', date: '2024-11-01', amount: 50000, receiptNo: 'RCP-20241101', category: { id: '1', name: 'Regular Savings', interestRate: 6 }, type: 'deposit', status: 'completed' },
  { id: '3', memberId: '1', date: '2024-10-15', amount: 100000, receiptNo: 'RCP-20241015', category: { id: '2', name: 'Target Savings', interestRate: 8 }, type: 'deposit', status: 'completed' },
  { id: '4', memberId: '1', date: '2024-10-01', amount: 50000, receiptNo: 'RCP-20241001', category: { id: '1', name: 'Regular Savings', interestRate: 6 }, type: 'deposit', status: 'completed' },
  { id: '5', memberId: '1', date: '2024-09-15', amount: 75000, receiptNo: 'RCP-20240915', category: { id: '3', name: 'Emergency Fund', interestRate: 5 }, type: 'deposit', status: 'completed' },
  { id: '6', memberId: '1', date: '2024-09-01', amount: 50000, receiptNo: 'RCP-20240901', category: { id: '1', name: 'Regular Savings', interestRate: 6 }, type: 'deposit', status: 'completed' },
]

// ─── Deposits ────────────────────────────────────────────────────────────────
export const mockDeposits: DepositAccount[] = [
  { id: '1', memberId: '1', date: '2024-11-10', amount: 200000, receiptNo: 'DEP-001', category: 'fixed', maturityDate: '2025-05-10', interestRate: 10, interestEarned: 10000, status: 'active' },
  { id: '2', memberId: '1', date: '2024-08-01', amount: 80000, receiptNo: 'DEP-002', category: 'recurring', interestRate: 7, interestEarned: 4667, status: 'active' },
  { id: '3', memberId: '1', date: '2024-05-20', amount: 40000, receiptNo: 'DEP-003', category: 'fixed', maturityDate: '2024-11-20', interestRate: 9, interestEarned: 1800, status: 'matured' },
]

// ─── Shares ──────────────────────────────────────────────────────────────────
export const mockShares: ShareTransaction[] = [
  { id: '1', memberId: '1', date: '2024-12-01', amount: 25000, units: 10, receiptNo: 'SHR-001', category: { id: '1', name: 'Ordinary Shares', unitValue: 2500 }, type: 'purchase', status: 'completed' },
  { id: '2', memberId: '1', date: '2024-09-15', amount: 50000, units: 20, receiptNo: 'SHR-002', category: { id: '1', name: 'Ordinary Shares', unitValue: 2500 }, type: 'purchase', status: 'completed' },
  { id: '3', memberId: '1', date: '2024-06-01', amount: 375000, units: 150, receiptNo: 'SHR-003', category: { id: '2', name: 'Preference Shares', unitValue: 2500 }, type: 'purchase', status: 'completed' },
]

// ─── Loan Products ───────────────────────────────────────────────────────────
export const mockLoanProducts: LoanProduct[] = [
  { id: '1', name: 'Normal Loan', multiplier: 3, interestRate: 12, maxTenure: 36, minAmount: 100000, description: 'Standard loan up to 3× savings balance' },
  { id: '2', name: 'Emergency Loan', multiplier: 1, interestRate: 8, maxTenure: 12, minAmount: 50000, description: 'Fast-approval loan up to 1× savings balance' },
  { id: '3', name: 'Development Loan', multiplier: 5, interestRate: 15, maxTenure: 60, minAmount: 500000, description: 'Long-term development financing up to 5× savings' },
]

// ─── Loans ───────────────────────────────────────────────────────────────────
export const mockLoans: Loan[] = [
  {
    id: '1', memberId: '1',
    loanProduct: mockLoanProducts[0],
    principal: 600000, interestRate: 12, tenure: 18,
    dateDisbursed: '2024-06-01', dateApplied: '2024-05-20',
    installments: 18, netAmount: 600000,
    principalRepaid: 200000, interestRepaid: 36000,
    pendingPrincipal: 400000, pendingInterest: 30000,
    penalty: 0, status: 'active', stage: 'Active',
  },
  {
    id: '2', memberId: '1',
    loanProduct: mockLoanProducts[1],
    principal: 400000, interestRate: 8, tenure: 6,
    dateDisbursed: '2024-10-01', dateApplied: '2024-09-25',
    installments: 6, netAmount: 400000,
    principalRepaid: 0, interestRepaid: 0,
    pendingPrincipal: 400000, pendingInterest: 18000,
    penalty: 0, status: 'active', stage: 'New',
  },
]

// ─── Loan Guarantees ─────────────────────────────────────────────────────────
export const mockGuarantees: LoanGuarantee[] = [
  { id: '1', guarantorId: '1', borrowerId: '2', borrowerName: 'Amina Hassan', loanId: 'L-101', loanAmount: 500000, product: 'Normal Loan', tenure: 12, status: 'pending' },
  { id: '2', guarantorId: '1', borrowerId: '3', borrowerName: 'Peter Mchanga', loanId: 'L-085', loanAmount: 300000, product: 'Emergency Loan', tenure: 6, status: 'accepted' },
]

// ─── Penalties ───────────────────────────────────────────────────────────────
export const mockPenalties: LoanPenalty[] = []

// ─── Fees ────────────────────────────────────────────────────────────────────
export const mockFees: Fee[] = [
  { id: '1', name: 'Registration Fee', amount: 5000, paid: 5000, balance: 0, status: 'paid' },
  { id: '2', name: 'Annual Subscription 2024', amount: 12000, paid: 12000, balance: 0, status: 'paid' },
  { id: '3', name: 'Loan Processing Fee', amount: 6000, paid: 0, balance: 6000, status: 'pending', dueDate: '2024-12-31' },
  { id: '4', name: 'Insurance Premium 2024', amount: 3000, paid: 3000, balance: 0, status: 'paid' },
]

// ─── Fund Releases ───────────────────────────────────────────────────────────
export const mockFundReleases: FundRelease[] = [
  { id: '1', beneficiary: 'John Mwangi', amount: 600000, category: 'Normal Loan', approvedBy: 'Treasurer', dateApproved: '2024-06-01', status: 'released', signatories: { total: 3, signed: 3 } },
  { id: '2', beneficiary: 'John Mwangi', amount: 400000, category: 'Emergency Loan', approvedBy: '—', status: 'pending', signatories: { total: 3, signed: 1 } },
]

// ─── Complaints ──────────────────────────────────────────────────────────────
export const mockComplaints: Complaint[] = [
  { id: '1', refNo: 'CMP-001', memberId: '1', type: 'complaint', subject: 'Loan statement issue', description: '', priority: 'normal', status: 'resolved', dateSubmitted: '2024-10-12', dateResolved: '2024-10-18' },
  { id: '2', refNo: 'CMP-002', memberId: '1', type: 'inquiry', subject: 'Savings update delay', description: '', priority: 'high', status: 'in-review', dateSubmitted: '2024-11-01' },
]

// ─── Documents ───────────────────────────────────────────────────────────────
export const mockDocuments: Document[] = [
  { id: '1', title: 'Loan Application Form', type: 'pdf', size: '245 KB', updatedAt: '2024-12-01', category: 'Forms', downloadUrl: '#' },
  { id: '2', title: 'Member Registration Form', type: 'pdf', size: '180 KB', updatedAt: '2024-01-10', category: 'Forms', downloadUrl: '#' },
  { id: '3', title: 'Annual Report 2023', type: 'pdf', size: '2.4 MB', updatedAt: '2024-03-15', category: 'Reports', downloadUrl: '#' },
  { id: '4', title: 'SACCOS By-laws', type: 'pdf', size: '890 KB', updatedAt: '2022-06-01', category: 'Legal', downloadUrl: '#' },
  { id: '5', title: 'Loan Repayment Calculator', type: 'excel', size: '120 KB', updatedAt: '2024-06-20', category: 'Tools', downloadUrl: '#' },
  { id: '6', title: 'Membership Certificate', type: 'pdf', size: 'Generated', updatedAt: '2024-01-15', category: 'Personal', downloadUrl: '#' },
]

// ─── Budget ──────────────────────────────────────────────────────────────────
export const mockBudget: BudgetItem[] = [
  { id: '1', department: 'Operations', allocated: 120, spent: 98, remaining: 22, percentage: 82, fiscalYear: '2024' },
  { id: '2', department: 'Loans', allocated: 200, spent: 180, remaining: 20, percentage: 90, fiscalYear: '2024' },
  { id: '3', department: 'IT', allocated: 45, spent: 38, remaining: 7, percentage: 84, fiscalYear: '2024' },
  { id: '4', department: 'HR', allocated: 60, spent: 52, remaining: 8, percentage: 87, fiscalYear: '2024' },
  { id: '5', department: 'Marketing', allocated: 15, spent: 8, remaining: 7, percentage: 53, fiscalYear: '2024' },
  { id: '6', department: 'Admin', allocated: 10, spent: 7, remaining: 3, percentage: 70, fiscalYear: '2024' },
]

// ─── Assets ──────────────────────────────────────────────────────────────────
export const mockAssets: Asset[] = [
  { id: '1', assetId: 'AST-001', name: 'Office Server', category: 'IT Equipment', purchaseDate: '2022-01-15', purchaseValue: 8500000, currentValue: 6000000, condition: 'good', location: 'Head Office' },
  { id: '2', assetId: 'AST-002', name: 'Toyota Hilux', category: 'Vehicle', purchaseDate: '2021-06-20', purchaseValue: 65000000, currentValue: 45000000, condition: 'good', location: 'Head Office' },
  { id: '3', assetId: 'AST-003', name: 'Office Building', category: 'Real Estate', purchaseDate: '2018-03-10', purchaseValue: 450000000, currentValue: 620000000, condition: 'excellent', location: 'CBD' },
  { id: '4', assetId: 'AST-004', name: '15× Desktop Computers', category: 'IT Equipment', purchaseDate: '2023-07-01', purchaseValue: 22500000, currentValue: 20000000, condition: 'excellent', location: 'Head Office' },
]

// ─── Ledger ──────────────────────────────────────────────────────────────────
export const mockLedger: LedgerEntry[] = [
  { id: '1', date: '2024-12-01', type: 'Savings', description: 'Monthly Savings', credit: 50000, balance: 1200000, receiptNo: 'RCP-001' },
  { id: '2', date: '2024-11-28', type: 'Loan', description: 'Loan Repayment', debit: 120000, balance: 1150000, receiptNo: 'PMT-002' },
  { id: '3', date: '2024-11-15', type: 'Share', description: 'Share Purchase', credit: 25000, balance: 1270000, receiptNo: 'SHR-003' },
  { id: '4', date: '2024-11-10', type: 'Deposit', description: 'Fixed Deposit', credit: 200000, balance: 1245000, receiptNo: 'DEP-004' },
  { id: '5', date: '2024-11-02', type: 'Contribution', description: 'Social Welfare', credit: 10000, balance: 1045000, receiptNo: 'CTB-005' },
  { id: '6', date: '2024-11-01', type: 'Savings', description: 'Monthly Savings', credit: 50000, balance: 1035000, receiptNo: 'RCP-006' },
  { id: '7', date: '2024-10-28', type: 'Loan', description: 'Loan Disbursement', credit: 400000, balance: 985000, receiptNo: 'DSB-007' },
]

// ─── Payments ────────────────────────────────────────────────────────────────
export const mockPayments: Payment[] = [
  { id: '1', memberId: '1', date: '2024-12-01', amount: 170000, status: 'verified', receiptNo: 'PMT-2024-001', description: 'Monthly deductions' },
  { id: '2', memberId: '1', date: '2024-11-01', amount: 170000, status: 'verified', receiptNo: 'PMT-2024-002', description: 'Monthly deductions' },
  { id: '3', memberId: '1', date: '2024-10-01', amount: 170000, status: 'pending', receiptNo: 'PMT-2024-003', description: 'Monthly deductions' },
]

// ─── Contributions ───────────────────────────────────────────────────────────
export const mockContributions: Contribution[] = [
  { id: '1', memberId: '1', date: '2024-12-01', amount: 10000, receiptNo: 'CTB-001', category: 'Social Welfare', status: 'completed' },
  { id: '2', memberId: '1', date: '2024-11-01', amount: 10000, receiptNo: 'CTB-002', category: 'Social Welfare', status: 'completed' },
  { id: '3', memberId: '1', date: '2024-10-01', amount: 5000, receiptNo: 'CTB-003', category: 'Education Fund', status: 'completed' },
]

// ─── Members (Admin) ─────────────────────────────────────────────────────────
export const mockMembers: Member[] = [
  { id: '1', memberId: 'MEM-00234', firstName: 'John', lastName: 'Mwangi', phone: '+255 744 123 456', email: 'john@email.com', joinDate: '2020-01-15', totalSavings: 1200000, totalLoans: 800000, totalShares: 450000, status: 'active', nationalId: '1', gender: 'male', dateOfBirth: '1985-03-15', maritalStatus: 'married', nationality: 'Tanzanian', address: 'Dar es Salaam', employmentType: 'Public Servant', employer: 'TRA', grossSalary: 1500000, netSalary: 1100000 },
  { id: '2', memberId: 'MEM-00235', firstName: 'Amina', lastName: 'Hassan', phone: '+255 712 456 789', email: 'amina@email.com', joinDate: '2020-03-20', totalSavings: 980000, totalLoans: 500000, totalShares: 300000, status: 'active', nationalId: '2', gender: 'female', dateOfBirth: '1990-07-22', maritalStatus: 'single', nationality: 'Tanzanian', address: 'Dar es Salaam', employmentType: 'Private Sector', employer: 'Vodacom', grossSalary: 1200000, netSalary: 900000 },
  { id: '3', memberId: 'MEM-00236', firstName: 'Grace', lastName: 'Kimani', phone: '+255 756 789 012', email: 'grace@email.com', joinDate: '2021-06-10', totalSavings: 650000, totalLoans: 0, totalShares: 200000, status: 'active', nationalId: '3', gender: 'female', dateOfBirth: '1992-11-05', maritalStatus: 'married', nationality: 'Tanzanian', address: 'Arusha', employmentType: 'Public Servant', employer: 'Ministry of Health', grossSalary: 900000, netSalary: 700000 },
  { id: '4', memberId: 'MEM-00237', firstName: 'Peter', lastName: 'Mchanga', phone: '+255 713 321 654', email: 'peter@email.com', joinDate: '2019-11-05', totalSavings: 1800000, totalLoans: 300000, totalShares: 700000, status: 'active', nationalId: '4', gender: 'male', dateOfBirth: '1980-02-18', maritalStatus: 'married', nationality: 'Tanzanian', address: 'Mwanza', employmentType: 'Business Owner', employer: 'Self', grossSalary: 2500000, netSalary: 2000000 },
  { id: '5', memberId: 'MEM-00180', firstName: 'Sarah', lastName: 'Ochieng', phone: '+255 769 111 222', email: 'sarah@email.com', joinDate: '2018-04-22', totalSavings: 2400000, totalLoans: 0, totalShares: 1200000, status: 'inactive', nationalId: '5', gender: 'female', dateOfBirth: '1978-09-30', maritalStatus: 'divorced', nationality: 'Tanzanian', address: 'Dodoma', employmentType: 'Public Servant', employer: 'Parliament', grossSalary: 3000000, netSalary: 2400000 },
]

// ─── Dashboard chart data ────────────────────────────────────────────────────
export const activityChartData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  savings: [50, 50, 75, 50, 50, 100, 50, 50, 75, 50, 50, 50],
  loans: [0, 0, 0, 0, 0, 600, 0, 0, 0, 400, 0, 0],
}

export const accountingChartData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  revenue: [22, 24, 28, 26, 30, 32, 28, 31, 35, 33, 36, 35],
  expenses: [18, 20, 22, 21, 24, 26, 22, 25, 28, 27, 29, 28],
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const fmt = (n: number) => 'TZS ' + n.toLocaleString()
export const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `TZS ${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `TZS ${(n / 1_000).toFixed(0)}K`
  return `TZS ${n.toLocaleString()}`
}
