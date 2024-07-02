import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCurrentUserStore } from '@/stores/currentUser'

describe('useCurrentUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('updates the current user ID', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserId(1)
    expect(store.currentUser.id).toBe(1)
  })

  it('updates the current user name', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserName('John Doe')
    expect(store.currentUser.name).toBe('John Doe')
  })

  it('updates the current user email', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserEmail('john@example.com')
    expect(store.currentUser.email).toBe('john@example.com')
  })

  it('updates set the current user password', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserPassword('password123')
    expect(store.currentUser.password).toBe('password123')
  })

  it('clears the current user', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserId(1)
    store.setCurrentUserName('John Doe')
    store.setCurrentUserEmail('john@example.com')
    store.setCurrentUserPassword('password123')
    store.clearCurrentUser()
    expect(store.currentUser).toEqual({})
  })

  it('retrieves the current user', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserId(1)
    store.setCurrentUserName('John Doe')
    store.setCurrentUserEmail('john@example.com')
    store.setCurrentUserPassword('password123')
    expect(store.getCurrentUser).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })
  })

  it('retrieves the current user ID', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserId(1)
    expect(store.id).toBe(1)
  })

  it('retrieves the current user name', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserName('John Doe')
    expect(store.name).toBe('John Doe')
  })

  it('retrieves the current user email', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserEmail('john@example.com')
    expect(store.email).toBe('john@example.com')
  })

  it('retrieves the current user password', () => {
    const store = useCurrentUserStore()
    store.setCurrentUserPassword('password123')
    expect(store.password).toBe('password123')
  })
})