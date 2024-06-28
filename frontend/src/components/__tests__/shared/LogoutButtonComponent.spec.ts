import LogoutButtonComponent from '@/components/shared/LogoutButtonComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMockStores } from './stores/mockStores'

describe('LogoutButtonComponent', () => {
  it('renders the logout button', () => {
    const { pinia } = createMockStores()
    const wrapper = mount(LogoutButtonComponent, {
      global: {
        plugins: [pinia]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
