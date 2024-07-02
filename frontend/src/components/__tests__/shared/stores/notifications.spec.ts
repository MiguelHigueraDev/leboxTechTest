import { useNotificationStore, type Notification } from '@/stores/notifications'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('notifications', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a notification', () => {
    // Mock Date.now() to always return a fixed timestamp
    const mockDateNow = vi.spyOn(Date, 'now').mockReturnValue(123456789)

    const notification: Notification = {
      message: 'test',
      type: 'success',
      id: Date.now()
    }

    useNotificationStore().addNotification(notification.message, notification.type)
    expect(useNotificationStore().notifications).toContainEqual(notification)

    mockDateNow.mockRestore()
  })

  it('clears notifications', () => {
    useNotificationStore().addNotification('test', 'success')
    useNotificationStore().clearNotifications()

    expect(useNotificationStore().notifications).toEqual([])
  })

  it('removes a notification', () => {
    const mockDateNow = vi.spyOn(Date, 'now').mockReturnValue(123456789)
    const notification: Notification = {
      message: 'test',
      type: 'success',
      id: Date.now()
    }

    useNotificationStore().addNotification(notification.message, notification.type)
    useNotificationStore().removeNotification(notification.id)

    expect(useNotificationStore().notifications).toEqual([])
    mockDateNow.mockRestore()
  })

  it('retrieves all notifications', () => {
    const mockDateNow = vi.spyOn(Date, 'now').mockReturnValue(123456789)

    const notifications: Notification[] = [
      {
        message: 'test',
        type: 'success',
        id: Date.now()
      },
      {
        message: 'test2',
        type: 'error',
        id: Date.now()
      }
    ]

    notifications.forEach((notification) => {
      useNotificationStore().addNotification(notification.message, notification.type)
    })

    expect(useNotificationStore().getNotifications).toEqual(notifications)

    mockDateNow.mockRestore()
  })
})
