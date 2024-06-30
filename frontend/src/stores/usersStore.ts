import { fetchWrapper } from '@/helpers/fetchWrapper'
import { defineStore } from 'pinia'
import { useNotificationStore } from './notifications'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),
  actions: {
    /**
     * Fetches users from the API and sets them in the store.
     */
    async fetchUsers() {
      const notifications = useNotificationStore()
      try {
        const fetchedUsers = await fetchWrapper.get('http://localhost:8000/api/users')
        this.users = fetchedUsers.data
      } catch (error) {
        notifications.addNotification('Ocurrió un error al cargar los usuarios', 'error')
      }
    },
    /**
     * Fetches a user by ID.
     * @param id - The ID of the user to fetch.
     */
    async getUser(id: number) {
      const notifications = useNotificationStore()
      try {
        const fetchedUser = await fetchWrapper.get(`http://localhost:8000/api/users/${id}`)
        return fetchedUser.data
      } catch (error) {
        notifications.addNotification('Ocurrió un error al cargar el usuario', 'error')
      }
    },
    /**
     * Creates a user.
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    async createUser(name: string, email: string, password: string) {
      const notifications = useNotificationStore()
      try {
        await fetchWrapper.post('http://localhost:8000/api/users', { name, email, password })
        await this.fetchUsers()
        notifications.addNotification('Usuario creado correctamente', 'success')
      } catch (error) {
        notifications.addNotification('Ocurrió un error al crear el usuario', 'error')
      }
    },
    /**
     * Updates an existing user.
     * @param id - The ID of the user to update.
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    async updateUser(id: number, name: string, email: string, password: string) {
      const notifications = useNotificationStore()
      try {
        await fetchWrapper.put(`http://localhost:8000/api/users/${id}`, { name, email, password })
        await this.fetchUsers()
        notifications.addNotification('Usuario actualizado correctamente', 'success')
      } catch (error) {
        notifications.addNotification('Ocurrió un error al actualizar el usuario', 'error')
      }
    },
    /**
     * Deletes a user by ID.
     * @param id - The ID of the user to delete.
     */
    async deleteUser(id: number) {
      const notifications = useNotificationStore()
      try {
        await fetchWrapper.delete(`http://localhost:8000/api/users/${id}`)
        await this.fetchUsers()
        notifications.addNotification('Usuario eliminado correctamente', 'success')
      } catch (error) {
        notifications.addNotification('Ocurrió un error al eliminar el usuario', 'error')
      }
    },
    /**
     * Clears the users in the local store. This doesn't update the database.
     */
    clearUsers() {
      this.users = []
    }
  },
  getters: {
    /**
     * Retrieves the users.
     */
    getUsers(state) {
      return state.users
    }
  }
})
