import MainLayout from '@/layouts/MainLayout.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('MainLayout', () => {
  it('renders layout with contents', () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })
    const wrapper = mount(MainLayout, {
      slots: {
        default: '<div>Test</div>'
      },
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.text()).toContain('Test')
  })
})
