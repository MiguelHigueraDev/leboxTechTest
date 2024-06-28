import NotificationComponent from '@/components/shared/NotificationComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('NotificationComponent', () => {
  it('renders the success notification component with provided message', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: {
          id: 1,
          message: 'Test message',
          type: 'success'
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.classes()).toContain('bg-green-300')
  })

  it('renders the error notification component with provided message', () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        notification: {
          id: 1,
          message: 'Test message',
          type: 'error'
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.classes()).toContain('bg-red-300')
  })
})
