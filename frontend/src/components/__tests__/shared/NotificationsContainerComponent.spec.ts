import NotificationsContainerComponent from '@/components/shared/NotificationsContainerComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMockStores } from './stores/mockStores'

describe('NotificationsContainerComponent', () => {
  it('renders the notifications container component', () => {
    const { pinia } = createMockStores()

    const wrapper = mount(NotificationsContainerComponent, {
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
})
