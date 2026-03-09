// ─── Auth ───────────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'member'

export interface User {
  id: string
  memberId: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginRequest {
  username: string
  password: string
}

// ─── Member ─────────────────────────────────────────────────────────────────
export interface Member {
  id: string
  memberId: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female'
  nationalId: string
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
  nationality: string
  phone: string
  email: string
  address: string
  employmentType: string
  employer: string
  grossSalary: number
  netSalary: number
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  // Financial summary
  totalSavings?: number
  totalShares?: number
  totalDeposits?: number
  totalLoans?: number
}

export interface NextOfKin {
  name: string
  relationship: string
  phone: string
  nationalId: string
  address: string
  sharePercentage: number
}

export interface BankDetails {
  bankName: string
  accountNumber: string
  accountName: string
  branch: string
  swiftCode?: string
}

// ─── Savings ────────────────────────────────────────────────────────────────
export interface SavingsCategory {
  id: string
  name: string
  description?: string
  interestRate: number
}

export interface SavingsTransaction {
  id: string
  memberId: string
  date: string
  amount: number
  receiptNo: string
  category: SavingsCategory
  type: 'deposit' | 'withdrawal'
  status: 'pending' | 'completed' | 'failed'
  notes?: string
}

// ─── Deposits ───────────────────────────────────────────────────────────────
export interface DepositAccount {
  id: string
  memberId: string
  date: string
  amount: number
  receiptNo: string
  category: 'fixed' | 'recurring'
  maturityDate?: string
  interestRate: number
  interestEarned: number
  status: 'active' | 'matured' | 'closed'
}

// ─── Shares ─────────────────────────────────────────────────────────────────
export interface ShareCategory {
  id: string
  name: string
  unitValue: number
}

export interface ShareTransaction {
  id: string
  memberId: string
  date: string
  amount: number
  units: number
  receiptNo: string
  category: ShareCategory
  type: 'purchase' | 'transfer' | 'redemption'
  status: 'pending' | 'completed'
}

// ─── Loans ──────────────────────────────────────────────────────────────────
export type LoanStatus = 'pending' | 'approved' | 'active' | 'closed' | 'rejected' | 'disbursed'

export interface LoanProduct {
  id: string
  name: string
  multiplier: number
  interestRate: number
  maxTenure: number
  minAmount: number
  description: string
}

export interface Loan {
  id: string
  memberId: string
  loanProduct: LoanProduct
  principal: number
  interestRate: number
  tenure: number
  dateDisbursed?: string
  dateApplied: string
  installments: number
  netAmount: number
  principalRepaid: number
  interestRepaid: number
  pendingPrincipal: number
  pendingInterest: number
  penalty: number
  status: LoanStatus
  stage: string
  guarantors?: string[]
}

export interface LoanRepayment {
  id: string
  loanId: string
  date: string
  amount: number
  principal: number
  interest: number
  balance: number
  receiptNo: string
  status: 'completed' | 'pending' | 'failed'
}

export interface LoanGuarantee {
  id: string
  guarantorId: string
  borrowerId: string
  borrowerName: string
  loanId: string
  loanAmount: number
  product: string
  tenure: number
  status: 'pending' | 'accepted' | 'declined'
}

export interface LoanPenalty {
  id: string
  loanId: string
  date: string
  penaltyType: string
  daysDelayed: number
  penaltyAmount: number
  amountRecovered: number
  pendingAmount: number
  status: 'pending' | 'partial' | 'cleared'
}

// ─── Contributions ──────────────────────────────────────────────────────────
export interface Contribution {
  id: string
  memberId: string
  date: string
  amount: number
  receiptNo: string
  category: string
  status: 'pending' | 'completed'
}

// ─── Fees ───────────────────────────────────────────────────────────────────
export interface Fee {
  id: string
  name: string
  amount: number
  paid: number
  balance: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate?: string
}

// ─── Fund Release ───────────────────────────────────────────────────────────
export interface FundRelease {
  id: string
  beneficiary: string
  amount: number
  category: string
  approvedBy: string
  dateApproved?: string
  status: 'pending' | 'approved' | 'released' | 'rejected'
  signatories: { total: number; signed: number }
}

// ─── Complaints ─────────────────────────────────────────────────────────────
export interface Complaint {
  id: string
  refNo: string
  memberId: string
  type: 'complaint' | 'suggestion' | 'inquiry'
  subject: string
  description: string
  priority: 'normal' | 'high' | 'urgent'
  status: 'submitted' | 'in-review' | 'resolved' | 'closed'
  dateSubmitted: string
  dateResolved?: string
}

// ─── Documents ──────────────────────────────────────────────────────────────
export interface Document {
  id: string
  title: string
  type: 'pdf' | 'excel' | 'word'
  size: string
  updatedAt: string
  category: string
  downloadUrl: string
}

// ─── Budget ─────────────────────────────────────────────────────────────────
export interface BudgetItem {
  id: string
  department: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
  fiscalYear: string
}

// ─── Asset ──────────────────────────────────────────────────────────────────
export interface Asset {
  id: string
  assetId: string
  name: string
  category: string
  purchaseDate: string
  purchaseValue: number
  currentValue: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  location: string
  assignedTo?: string
}

// ─── Accounting ─────────────────────────────────────────────────────────────
export interface LedgerEntry {
  id: string
  date: string
  type: string
  description: string
  debit?: number
  credit?: number
  balance: number
  receiptNo: string
  memberId?: string
}

// ─── Payments ───────────────────────────────────────────────────────────────
export interface Payment {
  id: string
  memberId: string
  date: string
  amount: number
  status: 'pending' | 'verified' | 'rejected'
  receiptNo: string
  description?: string
}

// ─── Common ─────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  code: string
  status: number
}

export interface FilterParams {
  fromDate?: string
  toDate?: string
  category?: string
  status?: string
  search?: string
  page?: number
  pageSize?: number
}
