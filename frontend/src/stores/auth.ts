import { fetchWrapper } from '@/helpers/fetchWrapper'
import { router } from '@/router'
import { defineStore } from 'pinia'

interface AuthResponse {
  token: string
  expiresIn: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    returnUrl: ''
  }),
  actions: {
    async login(email: string, password: string) {
      const user = await fetchWrapper.post<AuthResponse>('http://localhost:8000/api/login', {
        email,
        password
      })
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      router.push(this.returnUrl || '/')
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
})
