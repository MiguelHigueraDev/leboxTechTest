import UserModal from '@/components/modals/UserModal.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMockStores } from '../shared/stores/mockStores'

describe('UserModal', () => {
  it('renders the create modal with the correct title', () => {
    const { pinia } = createMockStores()
    const wrapper = mount(UserModal, {
      props: {
        operation: 'create',
        isVisible: true
      },
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.text()).toContain('Crear usuario')
  })

  it('renders the edit modal with the correct title', () => {
    const { pinia } = createMockStores()
    const wrapper = mount(UserModal, {
      props: {
        operation: 'edit',
        isVisible: true
      },
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.text()).toContain('Editar usuario')
  })

  it('emits the close event when the close button is clicked', async () => {
    const { pinia } = createMockStores()
    const wrapper = mount(UserModal, {
      props: {
        operation: 'create',
        isVisible: true
      },
      global: {
        plugins: [pinia]
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
