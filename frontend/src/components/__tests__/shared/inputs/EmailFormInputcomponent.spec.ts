import EmailFormInputComponent from '@/components/shared/inputs/EmailFormInputComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('EmailFormInputComponent', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(EmailFormInputComponent, {
      props: {
        label: 'Email',
        modelValue: ''
      }
    })

    expect(wrapper.text()).toContain('Email')
    expect(wrapper.find('input').element).toHaveProperty('value', '')
  })

  it('validates the email input correctly', async () => {
    const wrapper = mount(EmailFormInputComponent, {
      props: {
        label: 'Email',
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('testing')
    expect(wrapper.text()).toContain('Por favor ingrese un email válido.')

    await wrapper.setProps({ modelValue: 'testing@gmail.com' })
    expect(wrapper.text()).not.toContain('Por favor ingrese un email válido.')
  })
})
