import BaseFormInputComponent from "@/components/shared/inputs/BaseFormInputComponent.vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe('BaseFormInputComponent', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(BaseFormInputComponent, {
        props: {
            label: 'Email',
            modelValue: ''
        }
    })

    expect(wrapper.text()).toContain('Email')
    expect(wrapper.find('input').element).toHaveProperty('value', '')
  })

  it('renders the input with the correct type (text)', async () => {
    const wrapper = mount(BaseFormInputComponent, {
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
    const wrapper = mount(BaseFormInputComponent, {
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
    const wrapper = mount(BaseFormInputComponent, {
        props: {
            label: 'Email',
            modelValue: ''
        }
    })

    await wrapper.find('input').setValue('testing')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

})