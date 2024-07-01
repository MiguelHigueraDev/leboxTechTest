import { fetchWrapper } from '@/helpers/fetchWrapper'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notifications'
import type { User } from '@/interfaces/User'

interface PaginatedUserData {
  data: User[]
  total: number
  current_page: number
  last_page: number
  per_page: number
  from: number
  to: number
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    totalUsers: 0,
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    from: 0,
    to: 0
  }),
  actions: {
    async handleRequest<T>(request: () => Promise<T>, successMsg: string, errorMsg: string) {
      const notifications = useNotificationStore()
      try {
        const result = await request()
        if (successMsg) notifications.addNotification(successMsg, 'success')
        return result
      } catch (error) {
        notifications.addNotification(errorMsg, 'error')
        throw error
      }
    },

    async fetchUsers(page: number = 1) {
      const request = () => fetchWrapper.get<PaginatedUserData>(`http://localhost:8000/api/users/?page=${page}`)
      const fetchedUsers = await this.handleRequest(request, '', 'Ocurrió un error al cargar los usuarios')
      Object.assign(this, {
        users: fetchedUsers.data,
        totalUsers: fetchedUsers.total,
        currentPage: fetchedUsers.current_page,
        lastPage: fetchedUsers.last_page,
        perPage: fetchedUsers.per_page,
        from: fetchedUsers.from,
        to: fetchedUsers.to
      })
    },

    async getUser(id: number) {
      const request = () => fetchWrapper.get<User>(`http://localhost:8000/api/users/${id}`)
      return this.handleRequest(request, '', 'Ocurrió un error al cargar el usuario')
    },

    async createUser(name: string, email: string, password: string) {
      const request = () => fetchWrapper.post('http://localhost:8000/api/users', { name, email, password })
      await this.handleRequest(request, 'Usuario creado correctamente', 'Ocurrió un error al crear el usuario')
      await this.fetchUsers(this.currentPage)
    },

    async updateUser(id: number, name: string, email: string, password: string) {
      const request = () => fetchWrapper.put(`http://localhost:8000/api/users/${id}`, { name, email, password })
      await this.handleRequest(request, 'Usuario actualizado correctamente', 'Ocurrió un error al actualizar el usuario')
      await this.fetchUsers(this.currentPage)
    },

    async deleteUser(id: number) {
      const request = () => fetchWrapper.delete(`http://localhost:8000/api/users/${id}`)
      await this.handleRequest(request, 'Usuario eliminado correctamente', 'Ocurrió un error al eliminar el usuario')
      await this.fetchUsers(this.currentPage)
    },

    clearUsers() {
      this.users = []
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    }
  }
})