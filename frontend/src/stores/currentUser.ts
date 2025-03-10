import { defineStore } from 'pinia'

export interface currentUser {
  id: number
  name: string
  email: string
  password: string
}

/**
 * This store is used for creating and updating users in modals in a more centralized way.
 */
export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    currentUser: {
      id: 0,
      name: '',
      email: '',
      password: ''
    }
  }),
  actions: {
    /**
     * Sets the current user ID
     * @param id - The ID of the user.
     */
    setCurrentUserId(id: number) {
      this.currentUser.id = id
    },
    /**
     * Sets the current user's name.
     * @param name - The name of the user.
     */
    setCurrentUserName(name: string) {
      this.currentUser.name = name
    },
    /**
     * Sets the current user's email.
     * @param email - The email of the user.
     */
    setCurrentUserEmail(email: string) {
      this.currentUser.email = email
    },
    /**
     * Sets the current user's password.
     * @param password - The password of the user.
     */
    setCurrentUserPassword(password: string) {
      this.currentUser.password = password
    },
    /**
     * Clears the current user.
     */
    clearCurrentUser() {
      this.currentUser = {} as currentUser
    }
  },
  getters: {
    /**
     * Retrieves the current user.
     * @returns The current user.
     */
    getCurrentUser(state) {
      return state.currentUser
    },
    id(state) {
      return state.currentUser.id
    },
    name(state) {
      return state.currentUser.name
    },
    email(state) {
      return state.currentUser.email
    },
    password(state) {
      return state.currentUser.password
    }
  }
})
