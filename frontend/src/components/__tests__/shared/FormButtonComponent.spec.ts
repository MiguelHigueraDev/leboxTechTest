import { mount } from '@vue/test-utils'
import FormButtonComponent from '@/components/shared/FormButtonComponent.vue'
import { describe, it, expect } from 'vitest'

describe('FormButtonComponent', () => {
  it('renders the button with the correct label', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    expect(wrapper.text()).toContain('Submit')
  })

  it('displays loading spinner when isLoading is true', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: true,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    expect(wrapper.text()).toContain('Cargando...')
    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })

  it('button is disabled when isLoading is true', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: true,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    const button = wrapper.find('button')
    expect(button.element).toHaveProperty('disabled', true)
    expect(button.classes()).toContain('cursor-not-allowed')
    expect(button.classes()).toContain('opacity-50')
  })

  it('button is not disabled when isLoading is false', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    const button = wrapper.find('button')
    expect(button.element).toHaveProperty('disabled', false)
    expect(button.classes()).not.toContain('cursor-not-allowed')
    expect(button.classes()).not.toContain('opacity-50')
  })

  it('button is disabled when isDisabled is true', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit',
        isDisabled: true,
        type: 'success'
      }
    })

    const button = wrapper.find('button')
    expect(button.element).toHaveProperty('disabled', true)
    expect(button.classes()).toContain('cursor-not-allowed')
    expect(button.classes()).toContain('opacity-50')
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('applies the correct class based on the type prop', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit',
        isDisabled: false,
        type: 'success'
      }
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('success')
  })
})
