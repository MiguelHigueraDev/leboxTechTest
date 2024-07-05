import { fetchWrapper } from '@/helpers/fetchWrapper'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notifications'
import type { User } from '@/interfaces/User'

/**
 * This is the response from the API when fetching users.
 */
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
    // Centralized way of handling requests and showing notifications
    async handleRequest<T>(request: () => Promise<T>, successMsg: string, errorMsg: string) {
      const notifications = useNotificationStore()
      try {
        const result = await request()
        if (successMsg) notifications.addNotification(successMsg, 'success')
        return result
      } catch (error) {
        this.sendErrorNotification(error, errorMsg)
        throw error
      }
    },

    // Send specific notifications or a default one
    sendErrorNotification(error: any, errorMsg: string) {
      const notifications = useNotificationStore()
      if (error.email) {
        notifications.addNotification('El email ya está siendo usado por otro usuario.', 'error')
      } else {
        notifications.addNotification(errorMsg, 'error')
      }
    },

    // Paginated users
    async fetchUsers(page: number = 1) {
      const request = () =>
        fetchWrapper.get<PaginatedUserData>(`http://localhost:8000/api/users/?page=${page}`)
      const fetchedUsers = await this.handleRequest(
        request,
        '',
        'Ocurrió un error al cargar los usuarios'
      )
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

    // One user
    async getUser(id: number) {
      const request = () => fetchWrapper.get<User>(`http://localhost:8000/api/users/${id}`)
      return this.handleRequest(request, '', 'Ocurrió un error al cargar el usuario')
    },

    async createUser(name: string, email: string, password: string) {
      const request = () =>
        fetchWrapper.post('http://localhost:8000/api/users', { name, email, password })
      await this.handleRequest(
        request,
        'Usuario creado correctamente',
        'Ocurrió un error al crear el usuario'
      )
      // Fetch the last page to always show the new user
      await this.fetchLastPage()
      await this.fetchUsers(this.currentPage)
    },

    async updateUser(id: number, name: string, email: string, password: string) {
      const request = () =>
        fetchWrapper.put(`http://localhost:8000/api/users/${id}`, { name, email, password })
      await this.handleRequest(
        request,
        'Usuario actualizado correctamente',
        'Ocurrió un error al actualizar el usuario'
      )
      await this.fetchUsers(this.currentPage)
    },

    async deleteUser(id: number) {
      const request = () => fetchWrapper.delete(`http://localhost:8000/api/users/${id}`)
      await this.handleRequest(
        request,
        'Usuario eliminado correctamente',
        'Ocurrió un error al eliminar el usuario'
      )
      // There was one user left on the last page,
      // so we need to go back one page if page > 0
      if (this.from === this.to && this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - 1)
      }
      await this.fetchUsers(this.currentPage)
    },

    async fetchLastPage() {
      const request = () =>
        fetchWrapper.get<PaginatedUserData>(`http://localhost:8000/api/users/?page=1}`)
      const data = await this.handleRequest(request, '', '')
      this.setCurrentPage(data.last_page)
    },

    setCurrentPage(page: number) {
      this.currentPage = page
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
