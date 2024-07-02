import UserFormComponent from '@/components/users/UserFormComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('UserFormComponent', () => {
  it('renders the form with the correct fields', () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    })
    const wrapper = mount(UserFormComponent, {
      props: {
        isVisible: true,
        operation: 'create'
      },
      plugins: [pinia]
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.text()).toContain('Correo')
    expect(wrapper.text()).toContain('Contraseña')
  })

  
})
