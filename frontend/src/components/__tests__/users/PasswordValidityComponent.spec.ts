import PasswordValidityComponent from '@/components/users/PasswordValidityComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('PasswordValidityComponent', () => {
  it('renders the component', () => {
    const wrapper = mount(PasswordValidityComponent, {
      props: {
        password: 'Contraseña123!'
      }
    })

    expect(wrapper.text()).toContain('Requisitos')
  })

  it('validates the password correctly', async () => {
    const wrapper = mount(PasswordValidityComponent, {
      props: {
        password: 'contraseña123'
      }
    })

    // Two of the requirements are not met (uppercase letter and special character)
    expect(wrapper.findAll('.x-icon').length).toBe(2)

    await wrapper.setProps({ password: 'contraseña123!' })
    // One of the requirements is not met (uppercase letter)
    expect(wrapper.findAll('.x-icon').length).toBe(1)

    await wrapper.setProps({ password: 'Contraseña123!' })
    // All requirements are met
    expect(wrapper.findAll('.x-icon').length).toBe(0)
  })
})
