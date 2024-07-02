import LogoutButtonComponent from '@/components/shared/LogoutButtonComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'

describe('LogoutButtonComponent', () => {
  it('renders the logout button', () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })
    const wrapper = mount(LogoutButtonComponent, {
      global: {
        plugins: [pinia]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('calls logout and shows notification when button is clicked', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn
    })
    const authStore = useAuthStore(pinia)
    authStore.logout = vi.fn()

    const notifications = useNotificationStore(pinia)
    notifications.addNotification = vi.fn()

    const wrapper = mount(LogoutButtonComponent, {
      global: {
        plugins: [pinia]
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(authStore.logout).toHaveBeenCalled()
    expect(notifications.addNotification).toHaveBeenCalledWith(
      'Cierre de sesión exitoso.',
      'success'
    )
  })
})
