import { fetchWrapper } from '@/helpers/fetchWrapper'
import { useAuthStore } from '@/stores/auth'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the fetchWrapper
vi.mock('@/helpers/fetchWrapper', () => ({
  fetchWrapper: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('auth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('logs in a user', async () => {
    const mockTokenResponse = {
      token: 'token',
      expiresIn: 3600
    }

    fetchWrapper.post.mockResolvedValue(mockTokenResponse)

    const authStore = useAuthStore()
    await authStore.login('john@example.com', 'password')

    expect(authStore.user).toEqual(mockTokenResponse)
  })

  it('logs out a user', () => {
    const authStore = useAuthStore()
    authStore.logout()

    expect(authStore.user).toBeNull()
  })
})
