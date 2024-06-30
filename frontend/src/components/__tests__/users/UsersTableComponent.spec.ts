import UsersTableComponent from '@/components/users/UsersTableComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('UsersTableComponent', () => {
  it('renders the table with the correct headers', () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        users: [
          {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com',
            password: 'asdasd'
          }
        ]
      }
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Acciones')
  })

  it('renders an error message when there are no users', () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        users: []
      }
    })

    expect(wrapper.text()).toContain('No hay usuarios registrados.')
  })

  it('emits the edit and delete events when buttons are clicked', async () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        users: [
          {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com',
            password: 'asdasd'
          }
        ]
      }
    })

    await wrapper.find('button.edit').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit')

    await wrapper.find('button.delete').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
  })
})
