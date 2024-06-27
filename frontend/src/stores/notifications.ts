import { defineStore } from 'pinia'

export interface Notification {
  id: number
  message: string
  type: NotificationType
}
export type NotificationType = 'success' | 'error'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    /**
     * Adds a new notification and sets a timeout to remove it after 10 seconds.
     * @param message - The message of the notification.
     * @param type - The type of the notification ('success' or 'error').
     */
    addNotification(message: string, type: NotificationType) {
      const notificationWithId = {
        message,
        type,
        id: Date.now()
      }
      this.notifications.push(notificationWithId)

      // Remove the notification after 10 seconds
      setTimeout(() => {
        this.removeNotification(notificationWithId.id)
      }, 10000)
    },
    /**
     * Removes a notification by its ID.
     * @param notificationId - The ID of the notification to remove.
     */
    removeNotification(notificationId: number) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notificationId
      )
    },
    /**
     * Clears all notifications.
     */
    clearNotifications() {
      this.notifications = []
    }
  },
  getters: {
    /**
     * Retrieves all notifications.
     * @returns The list of notifications.
     */
    getNotifications(state) {
      return state.notifications
    }
  }
})
