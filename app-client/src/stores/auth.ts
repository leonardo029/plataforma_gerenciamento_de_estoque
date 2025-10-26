// Utilities
import { defineStore } from 'pinia'
import { login as authLogin } from '@/services/auth'

export type AuthState = {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await authLogin({ email, password })
        this.token = res.access_token
        localStorage.setItem('token', res.access_token)
        this.isAuthenticated = true
        return true
      } catch (err: any) {
        const message = err?.message ?? 'Falha ao autenticar'
        this.error = Array.isArray(message) ? message.join(', ') : message
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem('token')
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.isAuthenticated = false
      this.error = null
      localStorage.removeItem('token')
    },
  },
})