import TextFormInputComponent from '@/components/shared/inputs/TextFormInputComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TextFormInputComponent', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(TextFormInputComponent, {
      props: {
        label: 'Nombre',
        modelValue: ''
      }
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.find('input').element).toHaveProperty('value', '')
  })

  it('validates the email input correctly', async () => {
    const wrapper = mount(TextFormInputComponent, {
      props: {
        label: 'Texto',
        minLength: 5,
        maxLength: 10,
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('t')
    expect(wrapper.text()).toContain('debe tener entre 5 y 10 caracteres')

    await wrapper.setProps({ modelValue: 'testing' })
    expect(wrapper.text()).not.toContain('debe tener entre 5 y 10 caracteres.')
  })
})
