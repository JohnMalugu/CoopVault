import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { getInitials } from '@/utils/formatters'
import toast from 'react-hot-toast'
import { Sun, Moon, Bell, User, Settings, Globe, LogOut } from 'lucide-react'

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ledger': 'Financial Ledger',
  '/documents': 'Reference Documents',
  '/profile': 'My Profile',
  '/savings': 'My Savings',
  '/deposits': 'My Deposits',
  '/shares': 'My Shares',
  '/loans': 'My Loans',
  '/guarantee': 'Loan Guarantee',
  '/approve': 'Loan Approval',
  '/calculator': 'Loan Calculator',
  '/fees': 'Fees & Charges',
  '/fund-release': 'Fund Release',
  '/complaints': 'Complaints & Suggestions',
  '/contributions': 'Other Contributions',
  '/payments': 'Payment Submissions',
  '/penalties': 'Loan Penalties',
  '/members': 'Member Management',
  '/budget': 'Budget & Planning',
  '/expenses': 'Expenses',
  '/assets': 'Asset Management',
  '/accounting': 'Accounting',
}

export const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const { toggleSidebar, toggleDarkMode, darkMode } = useUIStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const title = routeTitles[location.pathname] ?? 'CoopVault'

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-3 z-30 md:pl-72">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-lg"
      >☰</button>

      <h1 className="text-base font-bold text-gray-900 dark:text-white flex-1 tracking-tight">{title}</h1>

      <div className="flex items-center gap-1">
        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-all active:scale-95"
          onClick={() => toast('No new notifications', { 
            icon: <Bell size={18} className="text-accent-500" />,
            className: "dark:bg-gray-800 dark:text-white"
          })}
        >
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent-500 rounded-full border-2 border-white dark:border-gray-900" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setDropdownOpen(o => !o)}
          >
            {getInitials(user?.name ?? 'U')}
          </div>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-modal z-50 animate-fade-in overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.memberId}</div>
                </div>
                {[
                  { icon: User, label: 'My Profile', action: () => navigate('/profile') },
                  { icon: Settings, label: 'Settings', action: () => toast('Settings coming soon') },
                  { icon: Globe, label: 'Language: EN', action: () => toast('Language switching coming soon') },
                ].map(item => (
                  <div
                    key={item.label}
                    onClick={() => { item.action(); setDropdownOpen(false) }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    <item.icon size={16} className="text-gray-400 group-hover:text-inherit" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 dark:border-gray-800">
                  <div
                    onClick={() => { logout(); navigate('/login') }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="font-bold">Logout</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
