# CoopVault — SACCOS Management Platform

A modern, responsive SACCOS (Savings and Credit Cooperative Society) management platform built with React, Vite, TypeScript, TailwindCSS, React Router, TanStack Query, and Apollo GraphQL.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Demo credentials:** Any username/password — select Member or Admin role.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | TailwindCSS 3 |
| Routing | React Router v6 |
| Server State | TanStack Query v5 |
| GraphQL | Apollo Client v3 |
| REST Auth | Axios (UAA) |
| Global State | Zustand |
| Charts | Chart.js + react-chartjs-2 |
| Notifications | react-hot-toast |
| UI Components | Headless UI |

---

## 📁 Project Structure

```
src/
├── api/                    # REST API clients (UAA auth)
│   ├── auth.ts             # Login, logout, token refresh
│   └── client.ts           # Axios instance with interceptors
│
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Stepper.tsx
│   │   └── Table.tsx
│   ├── layout/             # App shell components
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── charts/             # Chart.js wrappers
│       ├── ActivityChart.tsx
│       ├── AccountingChart.tsx
│       └── PortfolioChart.tsx
│
├── graphql/                # Apollo GraphQL
│   ├── client.ts           # Apollo client setup
│   ├── queries.ts          # All GQL queries
│   └── mutations.ts        # All GQL mutations
│
├── hooks/                  # Custom React hooks
│
├── layouts/
│   └── DashboardLayout.tsx # Protected layout wrapper
│
├── modules/                # Feature modules
│   ├── dashboard/
│   ├── savings/
│   ├── deposits/
│   ├── loans/              # Loans, Calculator, Guarantee, Approve
│   ├── shares/
│   ├── members/
│   ├── contributions/
│   └── profile/            # Multi-step profile form
│
├── pages/                  # Page components
│   ├── LoginPage.tsx
│   └── miscPages.tsx       # Fees, Complaints, Ledger, Admin pages
│
├── store/                  # Zustand stores
│   ├── authStore.ts        # Auth state + persistence
│   └── uiStore.ts          # UI state (sidebar, dark mode)
│
├── types/
│   └── index.ts            # All TypeScript types
│
└── utils/
    ├── formatters.ts       # Currency, date formatters
    └── mockData.ts         # Development mock data
```

---

## ✨ Features

### Authentication (REST UAA)
- Role-based login (Member / Admin)
- JWT access + refresh tokens
- Auto token refresh on 401
- Protected routes

### Member Self-Service
- **Dashboard** — Summary cards, activity charts, quick links
- **My Savings** — History, filters, categories
- **My Deposits** — Fixed/recurring deposits, maturity tracking
- **My Shares** — Portfolio, unit tracking, dividends
- **My Loans** — Active loans, repayment schedule, loan products
- **Loan Calculator** — Real-time eligibility & repayment calculation
- **Loan Guarantee** — Accept/decline guarantee requests
- **Loan Approval** — Review and approve loan applications
- **My Profile** — 7-step editable form (Biodata, Next of Kin, Spouse, Bank, Contacts, Income, Credentials)
- **Fees & Charges** — Fee schedule with payment status
- **Fund Release** — Disbursement tracking with signatories
- **Complaints & Suggestions** — Submit and track complaints
- **Other Contributions** — Social welfare, education fund
- **Payment Submissions** — Payment history and receipts
- **Loan Penalties** — Penalty tracking
- **Financial Ledger** — Complete transaction history
- **Reference Documents** — Downloadable forms and reports

### Admin Modules
- **Member Management** — Register, search, edit members
- **Budget & Planning** — Departmental budget utilization
- **Expenses** — Organizational expense tracking
- **Asset Management** — Asset register with condition tracking
- **Accounting** — Financial reports and charts

### UI/UX
- 🌙 Dark mode
- 📱 Fully responsive (mobile-first)
- 📊 Interactive Chart.js charts
- 🔔 Toast notifications
- ⚡ Loading skeletons
- 🔍 Advanced filters with date ranges
- 📄 Paginated data tables
- 🎨 Consistent design system (TailwindCSS)

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | REST API base URL | `http://localhost:8080/api` |
| `VITE_GRAPHQL_URL` | GraphQL endpoint | `http://localhost:8080/graphql` |

### API Endpoints (UAA REST)

| Method | Path | Description |
|---|---|---|
| POST | `/uaa/login` | Login with credentials |
| POST | `/uaa/logout` | Logout |
| POST | `/uaa/refresh` | Refresh access token |
| GET | `/uaa/me` | Get current user |
| PUT | `/uaa/password` | Change password |

All other data operations use **GraphQL** via Apollo Client.

---

## 🗺️ Routes

| Path | Component | Role |
|---|---|---|
| `/login` | LoginPage | Public |
| `/dashboard` | DashboardPage | All |
| `/savings` | SavingsPage | Member |
| `/deposits` | DepositsPage | Member |
| `/shares` | SharesPage | Member |
| `/loans` | LoansPage | Member |
| `/calculator` | LoanCalculator | Member |
| `/guarantee` | GuaranteePage | Member |
| `/approve` | ApprovePage | Member/Admin |
| `/profile` | ProfilePage | All |
| `/complaints` | ComplaintsPage | All |
| `/fees` | FeesPage | Member |
| `/fund-release` | FundReleasePage | Member |
| `/documents` | DocumentsPage | All |
| `/ledger` | LedgerPage | All |
| `/payments` | PaymentsPage | Member |
| `/penalties` | PenaltiesPage | Member |
| `/contributions` | ContributionsPage | Member |
| `/members` | MembersPage | Admin |
| `/budget` | BudgetPage | Admin |
| `/expenses` | ExpensesPage | Admin |
| `/assets` | AssetsPage | Admin |
| `/accounting` | AccountingPage | Admin |

---

## 📦 Build

```bash
npm run build
npm run preview
```
