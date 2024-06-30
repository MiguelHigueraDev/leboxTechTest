import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'

describe('DeleteConfirmationModal', () => {
  it('renders the modal with the correct title', () => {
    const wrapper = mount(DeleteConfirmationModal, {
      props: {
        isVisible: true,
        isLoading: false
      }
    })

    expect(wrapper.text()).toContain('Confirmar eliminación')
  })

  it('emits the close event when the close button is clicked', async () => {
    const wrapper = mount(DeleteConfirmationModal, {
      props: {
        isVisible: true,
        isLoading: false
      }
    })

    await wrapper.find('button.close').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('emits the delete user event when the confirm button is clicked', async () => {
    const wrapper = mount(DeleteConfirmationModal, {
      props: {
        isVisible: true,
        isLoading: false
      }
    })

    await wrapper.find('button.form-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('deleteUser')
  })
})
