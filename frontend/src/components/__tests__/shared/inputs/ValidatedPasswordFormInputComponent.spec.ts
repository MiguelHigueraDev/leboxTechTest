import ValidatedPasswordFormInputComponent from '@/components/shared/inputs/ValidatedPasswordFormInputComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('ValidatedPasswordFormInputComponent', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(ValidatedPasswordFormInputComponent, {
      props: {
        label: 'Nombre',
        modelValue: ''
      }
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.find('input').element).toHaveProperty('value', '')
  })

  it('validates the email input correctly', async () => {
    const wrapper = mount(ValidatedPasswordFormInputComponent, {
      props: {
        label: 'Texto',
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('contraseña')
    expect(wrapper.text()).toContain('contraseña no es válida')

    await wrapper.setProps({ modelValue: 'contraseña12' })
    expect(wrapper.text()).toContain('contraseña no es válida')

    await wrapper.setProps({ modelValue: 'contraseña12!' })
    expect(wrapper.text()).toContain('contraseña no es válida')

    await wrapper.setProps({ modelValue: 'Contraseña12!' })
    expect(wrapper.text()).not.toContain('contraseña no es válida')
  })
})
