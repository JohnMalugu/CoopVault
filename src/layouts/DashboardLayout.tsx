import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { clsx } from 'clsx'

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Topbar />

      <main className={clsx(
        'pt-16 transition-all duration-300',
        'md:pl-64'
      )}>
        <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
