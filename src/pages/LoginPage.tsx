import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { mockLogin } from '@/api/auth'
import toast from 'react-hot-toast'

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('MEM-00234')
  const [password, setPassword] = useState('password')
  const [role, setRole] = useState<'member' | 'admin'>('member')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!username || !password) { toast.error('Enter credentials'); return }
    setLoading(true)
    try {
      const { user, tokens } = await mockLogin(username, role)
      login(user, tokens)
      toast.success(`Welcome, ${user.name}!`)
      navigate('/dashboard')
    } catch {
      toast.error('Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 w-full max-w-md shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-fade-in relative">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center text-2xl">🏦</div>
          <div>
            <div className="text-xl font-extrabold text-primary-600 tracking-tight">CoopVault</div>
            <div className="text-xs text-gray-400 font-medium">SACCOS Management Platform</div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to access your account</p>

        {/* Role toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          {(['member', 'admin'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={[
                'flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200',
                role === r
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              ].join(' ')}
            >
              {r === 'member' ? '👤' : '🛡️'} {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
              Username / Member ID
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g. MEM-00234"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-primary-700 to-primary-500 text-white font-bold text-sm tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Sign in →'}
        </button>

        <p className="text-xs text-center text-gray-400 mt-5">
          Forgot password? <span className="text-primary-600 font-semibold cursor-pointer">Contact your administrator</span>
        </p>
      </div>
    </div>
  )
}
