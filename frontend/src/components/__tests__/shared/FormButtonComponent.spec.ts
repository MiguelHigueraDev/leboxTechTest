import { mount } from '@vue/test-utils'
import FormButtonComponent from '@/components/shared/FormButtonComponent.vue'
import { describe, it, expect } from 'vitest'

describe('ButtonComponent', () => {
  it('renders the button with the correct label', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit'
      }
    })

    expect(wrapper.text()).toContain('Submit')
  })

  it('displays loading spinner when isLoading is true', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: true,
        label: 'Submit'
      }
    })

    expect(wrapper.text()).toContain('Cargando...')
    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })

  it('button is disabled when isLoading is true', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: true,
        label: 'Submit'
      }
    })

    const button = wrapper.find('button')
    expect(button.element).toHaveProperty('disabled', true)
    expect(button.classes()).toContain('cursor-not-allowed')
    expect(button.classes()).toContain('opacity-90')
  })

  it('button is not disabled when isLoading is false', () => {
    const wrapper = mount(FormButtonComponent, {
      props: {
        isLoading: false,
        label: 'Submit'
      }
    })

    const button = wrapper.find('button')
    expect(button.element).toHaveProperty('disabled', false)
    expect(button.classes()).not.toContain('cursor-not-allowed')
    expect(button.classes()).not.toContain('opacity-90')
  })
})
