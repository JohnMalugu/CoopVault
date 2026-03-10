import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { getInitials } from '@/utils/formatters'
import { AlertTriangle, Banknote, BookText, Briefcase, Calculator, CheckCircle, CreditCard, Folder, Gift, Handshake, Landmark, LayoutDashboard, LineChart, MessageSquare, User, Wallet } from 'lucide-react'

interface NavItem {
  to?: string
  label: string
  icon: React.ElementType
  badge?: number
  children?: { to: string; label: string }[]
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ledger', label: 'Ledger', icon: BookText },
  { to: '/documents', label: 'Documents', icon: Folder },
]

const selfServiceItems: NavItem[] = [
  {
    label: 'My Profile', icon: User,
    children: [
      { to: '/profile', label: 'Biodata' },
      { to: '/profile?tab=kin', label: 'Next of Kin' },
      { to: '/profile?tab=bank', label: 'Bank Details' },
    ],
  },
  { to: '/savings', label: 'My Savings', icon: Wallet },
  { to: '/deposits', label: 'My Deposits', icon: Landmark },
  { to: '/shares', label: 'My Shares', icon: LineChart },
  { to: '/loans', label: 'My Loans', icon: CreditCard, badge: 2 },
  { to: '/guarantee', label: 'Loan Guarantee', icon: Handshake },
  { to: '/approve', label: 'Approve Loan', icon: CheckCircle },
  { to: '/calculator', label: 'Loan Calculator', icon: Calculator },
  { to: '/fees', label: 'Fees & Charges', icon: Briefcase },
  { to: '/fund-release', label: 'Fund Release', icon: Banknote },
  { to: '/complaints', label: 'Complaints', icon: MessageSquare },
  { to: '/contributions', label: 'Other Contributions', icon: Gift },
  { to: '/payments', label: 'Payment Submissions', icon: CreditCard },
  { to: '/penalties', label: 'Loan Penalties', icon: AlertTriangle },
]

const adminItems: NavItem[] = [
  { to: '/members', label: 'Members', icon: '👥', adminOnly: true },
  { to: '/budget', label: 'Budget & Planning', icon: '📊', adminOnly: true },
  { to: '/expenses', label: 'Expenses', icon: '💹', adminOnly: true },
  { to: '/assets', label: 'Asset Management', icon: '🏢', adminOnly: true },
  { to: '/accounting', label: 'Accounting', icon: '🔢', adminOnly: true },
]

const NavGroup: React.FC<{ item: NavItem }> = ({ item }) => {
  const [open, setOpen] = useState(false)

  if (item.to) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) => clsx(
          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5',
          isActive
            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    )
  }

  return (
    <>
      <div
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white cursor-pointer mb-0.5 transition-all duration-200"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        <span className={clsx('text-xs transition-transform duration-200', open && 'rotate-90')}>›</span>
      </div>
      <div className={clsx('overflow-hidden transition-all duration-300', open ? 'max-h-48' : 'max-h-0')}>
        {item.children?.map(child => (
          <NavLink
            key={child.to}
            to={child.to}
            className={({ isActive }) => clsx(
              'flex items-center gap-2 pl-10 pr-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5',
              isActive
                ? 'text-primary-600 dark:text-primary-400 font-semibold'
                : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
            )}
          >{child.label}</NavLink>
        ))}
      </div>
    </>
  )
}

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const { sidebarOpen } = useUIStore()
  const navigate = useNavigate()

  return (
    <aside className={clsx(
      'fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-40 transition-transform duration-300',
      !sidebarOpen && '-translate-x-full'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center text-lg flex-shrink-0">🏦</div>
        <div>
          <div className="text-base font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">CoopVault</div>
          <div className="text-[10px] text-gray-400 font-medium">SACCOS Platform</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-1">
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 mb-2">Overview</div>
          {navItems.map(item => <NavGroup key={item.label} item={item} />)}
        </div>

        <div className="mt-4 mb-1">
          <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 mb-2">Self Service</div>
          {selfServiceItems.map(item => <NavGroup key={item.label} item={item} />)}
        </div>

        {user?.role === 'admin' && (
          <div className="mt-4 mb-1">
            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 mb-2">Administration</div>
            {adminItems.map(item => <NavGroup key={item.label} item={item} />)}
          </div>
        )}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => navigate('/profile')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {getInitials(user?.name ?? 'U')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</div>
            <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); logout(); navigate('/login') }}
            className="text-gray-400 hover:text-red-500 transition-colors text-lg p-0.5"
            title="Logout"
          >⏻</button>
        </div>
      </div>
    </aside>
  )
}
