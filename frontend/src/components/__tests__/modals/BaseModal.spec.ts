import BaseModal from '@/components/modals/BaseModal.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('BaseModal', () => {
  it('renders the base modal with the correct title', () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Modal',
        isVisible: true
      }
    })

    expect(wrapper.text()).toContain('Modal')
  })

  it('emits the close event when the close button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Modal',
        isVisible: true
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
