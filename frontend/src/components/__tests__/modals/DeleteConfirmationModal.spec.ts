import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { createMockStores } from '../shared/stores/mockStores'

describe('DeleteConfirmationModal', () => {
  const { pinia } = createMockStores()

  it('renders the modal with the correct title', () => {
    const wrapper = mount(DeleteConfirmationModal, {
      props: {
        isVisible: true,
        userIdForDeletion: 1
      },
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.text()).toContain('Confirmar eliminación')
  })

  it('emits the close event when the close button is clicked', async () => {
    const wrapper = mount(DeleteConfirmationModal, {
      props: {
        isVisible: true,
        userIdForDeletion: 1
      },
      global: {
        plugins: [pinia]
      }
    })

    await wrapper.find('button.close').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
