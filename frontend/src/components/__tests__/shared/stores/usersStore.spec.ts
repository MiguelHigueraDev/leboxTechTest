import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUsersStore } from '@/stores/usersStore'
import { fetchWrapper } from '@/helpers/fetchWrapper'

// Mock the fetchWrapper and NotificationStore
vi.mock('@/helpers/fetchWrapper', () => ({
  fetchWrapper: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('@/stores/notifications', () => ({
  useNotificationStore: vi.fn(() => ({
    addNotification: vi.fn()
  }))
}))

describe('useUsersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches users and updates the store', async () => {
    const mockUsers = {
      data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 15,
      from: 1,
      to: 1
    }
    fetchWrapper.get.mockResolvedValue(mockUsers)

    const usersStore = useUsersStore()
    await usersStore.fetchUsers()

    expect(usersStore.users).toEqual(mockUsers.data)
    expect(usersStore.totalUsers).toBe(mockUsers.total)
    expect(usersStore.currentPage).toBe(mockUsers.current_page)
    expect(usersStore.lastPage).toBe(mockUsers.last_page)
    expect(usersStore.perPage).toBe(mockUsers.per_page)
    expect(usersStore.from).toBe(mockUsers.from)
    expect(usersStore.to).toBe(mockUsers.to)
  })

  it('fetches a single user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'test@gmail.com' }
    fetchWrapper.get.mockResolvedValue(mockUser)

    const usersStore = useUsersStore()
    const user = await usersStore.getUser(1)

    expect(user).toEqual(mockUser)
  })

  it('creates a new user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'test@gmail.com' }
    const mockUsers = {
      data: [mockUser],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 15,
      from: 1,
      to: 1
    }

    fetchWrapper.post.mockResolvedValue(mockUser)
    fetchWrapper.get.mockResolvedValue(mockUsers)

    const usersStore = useUsersStore()
    await usersStore.createUser('John Doe', 'test@gmail.com', 'Password1!')

    expect(usersStore.users).toEqual(mockUsers.data)
  })

  it('updates a user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'updated@gmail.com' }
    const mockUsers = {
      data: [mockUser],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 15,
      from: 1,
      to: 1
    }

    fetchWrapper.put.mockResolvedValue(mockUser)
    fetchWrapper.get.mockResolvedValue(mockUsers)

    const usersStore = useUsersStore()
    await usersStore.updateUser(1, 'John Doe', 'updated@gmail.com', 'NewPassword1!')

    expect(usersStore.users).toEqual(mockUsers.data)
  })

  it('deletes a user', async () => {
    const mockUsers = {
      data: [],
      total: 0,
      current_page: 1,
      last_page: 1,
      per_page: 15,
      from: 0,
      to: 0
    }

    fetchWrapper.delete.mockResolvedValue({})
    fetchWrapper.get.mockResolvedValue(mockUsers)

    const usersStore = useUsersStore()
    await usersStore.deleteUser(1)

    expect(usersStore.users).toEqual(mockUsers.data)
  })
})
