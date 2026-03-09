import { restClient } from './client'
import type { LoginRequest, User, AuthTokens } from '@/types'

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await restClient.post<LoginResponse>('/uaa/login', credentials)
    return data
  },

  logout: async (): Promise<void> => {
    await restClient.post('/uaa/logout')
  },

  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    const { data } = await restClient.post<AuthTokens>('/uaa/refresh', { refreshToken })
    return data
  },

  me: async (): Promise<User> => {
    const { data } = await restClient.get<User>('/uaa/me')
    return data
  },

  changePassword: async (payload: {
    currentPassword: string
    newPassword: string
  }): Promise<void> => {
    await restClient.put('/uaa/password', payload)
  },
}

// ─── Mock login for dev (no backend) ─────────────────────────────────────────
export const mockLogin = async (
  username: string,
  role: 'member' | 'admin'
): Promise<LoginResponse> => {
  await new Promise((r) => setTimeout(r, 800))

  const user: User = {
    id: '1',
    memberId: role === 'admin' ? 'ADM-001' : 'MEM-00234',
    name: role === 'admin' ? 'Admin User' : 'John Mwangi',
    email: role === 'admin' ? 'admin@saccos.co.tz' : 'john.mwangi@email.com',
    phone: '+255 744 123 456',
    role,
    joinDate: '2020-01-15',
    status: 'active',
  }

  const tokens: AuthTokens = {
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
    expiresIn: 3600,
  }

  return { user, tokens }
}
