import { gql } from '@apollo/client'

export const APPLY_LOAN = gql`
  mutation ApplyLoan($input: LoanApplicationInput!) {
    applyLoan(input: $input) {
      id
      status
      dateApplied
    }
  }
`

export const APPROVE_LOAN = gql`
  mutation ApproveLoan($loanId: ID!, $action: LoanAction!, $remarks: String) {
    approveLoan(loanId: $loanId, action: $action, remarks: $remarks) {
      id
      status
    }
  }
`

export const ACCEPT_GUARANTEE = gql`
  mutation AcceptGuarantee($guaranteeId: ID!, $accept: Boolean!) {
    respondToGuarantee(guaranteeId: $guaranteeId, accept: $accept) {
      id
      status
    }
  }
`

export const UPDATE_MEMBER_PROFILE = gql`
  mutation UpdateMemberProfile($memberId: ID!, $input: MemberProfileInput!) {
    updateMemberProfile(memberId: $memberId, input: $input) {
      id
      firstName
      lastName
    }
  }
`

export const SUBMIT_COMPLAINT = gql`
  mutation SubmitComplaint($input: ComplaintInput!) {
    submitComplaint(input: $input) {
      id
      refNo
      status
    }
  }
`

export const SUBMIT_PAYMENT = gql`
  mutation SubmitPayment($input: PaymentInput!) {
    submitPayment(input: $input) {
      id
      receiptNo
      status
    }
  }
`

export const UPDATE_BANK_DETAILS = gql`
  mutation UpdateBankDetails($memberId: ID!, $input: BankDetailsInput!) {
    updateBankDetails(memberId: $memberId, input: $input) {
      bankName
      accountNumber
    }
  }
`

export const ADD_EXPENSE = gql`
  mutation AddExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
      id
      amount
      status
    }
  }
`
