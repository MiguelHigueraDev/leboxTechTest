import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'

describe('LoadingSpinner', () => {
  it('renders the loading spinner', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the loading spinner with size 25', () => {
    const size = '25'
    const wrapper = mount(LoadingSpinner, {
      props: { size }
    })
    
    const spinnerElement = wrapper.element as HTMLElement
    expect(spinnerElement.style.width).toBe(`${size}px`)
    expect(spinnerElement.style.height).toBe(`${size}px`)
  })
})
