import { gql } from '@apollo/client'

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const GET_MEMBER_SUMMARY = gql`
  query GetMemberSummary($memberId: ID!) {
    memberSummary(memberId: $memberId) {
      totalSavings
      totalShares
      totalDeposits
      pendingLoans
      socialWelfare
      recentTransactions {
        id
        date
        type
        description
        amount
        status
      }
    }
  }
`

// ─── Savings ─────────────────────────────────────────────────────────────────
export const GET_SAVINGS = gql`
  query GetSavings($memberId: ID!, $filters: FilterInput) {
    savings(memberId: $memberId, filters: $filters) {
      data {
        id
        date
        amount
        receiptNo
        category { id name }
        type
        status
      }
      total
      page
      totalPages
    }
  }
`

export const GET_SAVINGS_CATEGORIES = gql`
  query GetSavingsCategories {
    savingsCategories {
      id
      name
      interestRate
    }
  }
`

// ─── Deposits ────────────────────────────────────────────────────────────────
export const GET_DEPOSITS = gql`
  query GetDeposits($memberId: ID!, $filters: FilterInput) {
    deposits(memberId: $memberId, filters: $filters) {
      data {
        id
        date
        amount
        receiptNo
        category
        maturityDate
        interestRate
        interestEarned
        status
      }
      total
      page
      totalPages
    }
  }
`

// ─── Shares ──────────────────────────────────────────────────────────────────
export const GET_SHARES = gql`
  query GetShares($memberId: ID!, $filters: FilterInput) {
    shares(memberId: $memberId, filters: $filters) {
      data {
        id
        date
        amount
        units
        receiptNo
        category { id name unitValue }
        type
        status
      }
      total
      page
      totalPages
    }
  }
`

// ─── Loans ───────────────────────────────────────────────────────────────────
export const GET_LOANS = gql`
  query GetLoans($memberId: ID!) {
    loans(memberId: $memberId) {
      id
      loanProduct { id name interestRate }
      principal
      tenure
      dateDisbursed
      dateApplied
      installments
      netAmount
      principalRepaid
      interestRepaid
      pendingPrincipal
      pendingInterest
      penalty
      status
      stage
    }
  }
`

export const GET_LOAN_PRODUCTS = gql`
  query GetLoanProducts {
    loanProducts {
      id
      name
      multiplier
      interestRate
      maxTenure
      minAmount
      description
    }
  }
`

export const GET_LOAN_GUARANTEES = gql`
  query GetLoanGuarantees($memberId: ID!) {
    loanGuarantees(memberId: $memberId) {
      id
      borrowerName
      loanAmount
      product
      tenure
      status
    }
  }
`

export const GET_PENDING_APPROVALS = gql`
  query GetPendingApprovals {
    pendingLoanApprovals {
      id
      dateApplied
      member { id name memberId }
      loanAmount
      product { name }
      tenure
      mandatoryShares
      voluntaryShares
      savings
      deposits
      otherContributions
    }
  }
`

// ─── Members ─────────────────────────────────────────────────────────────────
export const GET_MEMBERS = gql`
  query GetMembers($filters: MemberFilterInput) {
    members(filters: $filters) {
      data {
        id
        memberId
        firstName
        lastName
        phone
        joinDate
        totalSavings
        totalLoans
        totalShares
        status
      }
      total
      page
      totalPages
    }
  }
`

export const GET_MEMBER_PROFILE = gql`
  query GetMemberProfile($memberId: ID!) {
    memberProfile(memberId: $memberId) {
      id
      memberId
      firstName
      middleName
      lastName
      dateOfBirth
      gender
      nationalId
      maritalStatus
      nationality
      phone
      email
      address
      employmentType
      employer
      grossSalary
      netSalary
      joinDate
      status
    }
  }
`

// ─── Financial ───────────────────────────────────────────────────────────────
export const GET_LEDGER = gql`
  query GetLedger($memberId: ID, $filters: FilterInput) {
    ledger(memberId: $memberId, filters: $filters) {
      data {
        id
        date
        type
        description
        debit
        credit
        balance
        receiptNo
      }
      total
      page
      totalPages
    }
  }
`

export const GET_FEES = gql`
  query GetFees($memberId: ID!) {
    fees(memberId: $memberId) {
      id
      name
      amount
      paid
      balance
      status
      dueDate
    }
  }
`

export const GET_CONTRIBUTIONS = gql`
  query GetContributions($memberId: ID!, $filters: FilterInput) {
    contributions(memberId: $memberId, filters: $filters) {
      data {
        id
        date
        amount
        receiptNo
        category
        status
      }
      total
      page
      totalPages
    }
  }
`

export const GET_PENALTIES = gql`
  query GetPenalties($memberId: ID!) {
    penalties(memberId: $memberId) {
      id
      loanId
      date
      penaltyType
      daysDelayed
      penaltyAmount
      amountRecovered
      pendingAmount
      status
    }
  }
`

export const GET_BUDGET = gql`
  query GetBudget($fiscalYear: String) {
    budget(fiscalYear: $fiscalYear) {
      id
      department
      allocated
      spent
      remaining
      percentage
    }
  }
`

export const GET_ASSETS = gql`
  query GetAssets {
    assets {
      id
      assetId
      name
      category
      purchaseDate
      purchaseValue
      currentValue
      condition
      location
    }
  }
`
