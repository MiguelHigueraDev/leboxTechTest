import FormInputComponent from "@/components/shared/FormInputComponent.vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe('FormInputComponent', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(FormInputComponent, {
        props: {
            label: 'Email',
            modelValue: ''
        }
    })

    expect(wrapper.text()).toContain('Email')
    expect(wrapper.find('input').element).toHaveProperty('value', '')
  })

  it('renders the input with the correct type (text)', async () => {
    const wrapper = mount(FormInputComponent, {
        props: {
            label: 'Email',
            modelValue: ''
        },
        attrs: {
            type: 'text'
        }
    })

    expect(wrapper.find('input').element).toHaveProperty('type', 'text')
  })

  it('renders the input with the correct type (password)', async () => {
    const wrapper = mount(FormInputComponent, {
        props: {
            label: 'Password',
            modelValue: ''
        },
        attrs: {
            type: 'password'
        }
    })

    expect(wrapper.find('input').element).toHaveProperty('type', 'password')
  })
    
  it('emits an input event when the input value changes', async () => {
    const wrapper = mount(FormInputComponent, {
        props: {
            label: 'Email',
            modelValue: ''
        }
    })

    await wrapper.find('input').setValue('testing')
    expect(wrapper.emitted()).toHaveProperty('update')
  })

  it('shows email validation error when email is invalid', async () => {
    const wrapper = mount(FormInputComponent, {
      props: {
        label: 'Email',
        modelValue: ''
      },
      attrs: {
        type: 'email'
      }
    })

    await wrapper.find('input').setValue('testing')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toContain('Por favor ingrese una dirección de correo correcta.')
  })

  it('does not show email validation error when email is valid', async () => {
    const wrapper = mount(FormInputComponent, {
      props: {
        label: 'Email',
        modelValue: ''
      },
      attrs: {
        type: 'email'
      }
    })

    await wrapper.find('input').setValue('test@gmail.com')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('span').exists()).toBe(false)
  })

})