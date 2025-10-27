// Utilities
import { defineStore } from 'pinia'
import { login as authLogin } from '@/services/auth'
import router from '@/router'

export type AuthUser = {
  name: string
  email: string
  role: 'admin' | 'user'
}

export type AuthState = {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: (() => { try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null } })(),
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
        this.user = { name: res.name, email: res.email, role: res.role }
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('user', JSON.stringify(this.user))
        this.isAuthenticated = true
        return true
      } catch (err: any) {
        const message = err?.message ?? 'Falha ao autenticar'
        this.error = Array.isArray(message) ? message.join(', ') : message
        this.isAuthenticated = false
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return false
      } finally {
        this.loading = false
      }
    },
    async loginAndRedirect(email: string, password: string) {
      const ok = await this.login(email, password)
      if (ok) {
        router.push('/dashboard')
      }
      return ok
    },

    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      this.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    logoutAndRedirect() {
      this.logout()
      router.push('/')
    },
  },
})