import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'
import { apolloClient } from '@/graphql/client'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/modules/dashboard/DashboardPage'
import { SavingsPage } from '@/modules/savings/SavingsPage'
import { DepositsPage } from '@/modules/deposits/DepositsPage'
import { SharesPage } from '@/modules/shares/SharesPage'
import { LoansPage } from '@/modules/loans/LoansPage'
import { LoanCalculator } from '@/modules/loans/LoanCalculator'
import { GuaranteePage } from '@/modules/loans/GuaranteePage'
import { ApprovePage } from '@/modules/loans/ApprovePage'
import { ProfilePage } from '@/modules/profile/ProfilePage'
import { MembersPage } from '@/modules/members/MembersPage'
import { ContributionsPage } from '@/modules/contributions/ContributionsPage'
import {
  ComplaintsPage, FeesPage, FundReleasePage, DocumentsPage, LedgerPage,
  PaymentsPage, PenaltiesPage, BudgetPage, ExpensesPage, AssetsPage, AccountingPage,
} from '@/pages/miscPages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            {/* Self-service */}
            <Route path="savings" element={<SavingsPage />} />
            <Route path="deposits" element={<DepositsPage />} />
            <Route path="shares" element={<SharesPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="calculator" element={<LoanCalculator />} />
            <Route path="guarantee" element={<GuaranteePage />} />
            <Route path="approve" element={<ApprovePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="contributions" element={<ContributionsPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="fund-release" element={<FundReleasePage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="ledger" element={<LedgerPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="penalties" element={<PenaltiesPage />} />
            {/* Admin */}
            <Route path="members" element={<MembersPage />} />
            <Route path="budget" element={<BudgetPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="accounting" element={<AccountingPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'Sora, sans-serif',
            fontSize: '13px',
            borderRadius: '12px',
          },
        }}
      />
    </QueryClientProvider>
  </ApolloProvider>
)

export default App
