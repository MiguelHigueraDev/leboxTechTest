import UsersTableComponent from '@/components/users/UsersTableComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('UsersTableComponent', () => {
  it('renders the table with the correct headers', () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        usersData: {
          users: [],
          usersPerPage: 10,
          currentPage: 1,
          lastPage: 3,
          totalUsers: 0,
          from: 0,
          to: 32
        },
        loading: false
      }
    })

    expect(wrapper.text()).toContain('Nombre')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Acciones')
  })

  it('renders an error message when there are no users', () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        usersData: {
          users: [],
          usersPerPage: 10,
          currentPage: 1,
          lastPage: 3,
          totalUsers: 0,
          from: 0,
          to: 32
        },
        loading: false
      }
    })

    expect(wrapper.text()).toContain('No hay usuarios registrados.')
  })

  it('emits the edit and delete events when buttons are clicked', async () => {
    const wrapper = mount(UsersTableComponent, {
      props: {
        usersData: {
          users: [
            {
              id: 1,
              name: 'Test User',
              password: 'asd',
              email: 'test@gmail.com',
            }
          ],
          usersPerPage: 10,
          currentPage: 1,
          lastPage: 3,
          totalUsers: 0,
          from: 0,
          to: 32
        },
        loading: false
      }
    })

    await wrapper.find('button.edit').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit')

    await wrapper.find('button.delete').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
  })
})
