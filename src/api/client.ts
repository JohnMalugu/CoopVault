import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import { useAuthStore } from '@/store/authStore'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

export const restClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ─── Request Interceptor ────────────────────────────────────────────────────
restClient.interceptors.request.use((config) => {
  const tokens = useAuthStore.getState().tokens
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }
  return config
})

// ─── Response Interceptor ───────────────────────────────────────────────────
restClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true
      const tokens = useAuthStore.getState().tokens

      if (tokens?.refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/uaa/refresh`, {
            refreshToken: tokens.refreshToken,
          })
          useAuthStore.getState().login(
            useAuthStore.getState().user!,
            data
          )
          if (original) {
            original.headers!.Authorization = `Bearer ${data.accessToken}`
            return restClient(original)
          }
        } catch {
          useAuthStore.getState().logout()
        }
      } else {
        useAuthStore.getState().logout()
      }
    }

    return Promise.reject(error)
  }
)
