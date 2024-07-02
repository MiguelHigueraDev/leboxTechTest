import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserFormComponent from '@/components/users/UserFormComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUsersStore } from '@/stores/usersStore'

describe('UserFormComponent', () => {
  let wrapper: any
  let currentUserStore: any
  let usersStore: any

  beforeEach(() => {
    wrapper = mount(UserFormComponent, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            currentUser: {
              currentUser: { id: 0, name: '', email: '', password: '' }
            }
          },
          createSpy: vi.fn
        })],
        stubs: {
          TextFormInputComponent: true,
          EmailFormInputComponent: true,
          ValidatedPasswordFormInputComponent: true,
          FormButtonComponent: true,
          PasswordValidityComponent: true
        }
      },
      props: {
        isVisible: true,
        operation: 'create'
      }
    })

    currentUserStore = useCurrentUserStore()
    usersStore = useUsersStore()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('disables the form button when fields are invalid', async () => {
    const formButton = wrapper.findComponent({ name: 'FormButtonComponent' })
    expect(formButton.props('isDisabled')).toBe(true)
  })

  it('enables the form button when fields are valid', async () => {
    await wrapper.findComponent({ name: 'TextFormInputComponent' }).vm.$emit('update:isValid', true)
    await wrapper.findComponent({ name: 'EmailFormInputComponent' }).vm.$emit('update:isValid', true)
    await wrapper.findComponent({ name: 'ValidatedPasswordFormInputComponent' }).vm.$emit('update:isValid', true)
    expect(wrapper.vm.isNameValid).toBe(true)
    expect(wrapper.vm.isEmailValid).toBe(true)
    expect(wrapper.vm.isPasswordValid).toBe(true)
    const formButton = wrapper.findComponent({ name: 'FormButtonComponent' })
    expect(formButton.props('isDisabled')).toBe(false)
  })

  it('creates a new user when form is submitted', async () => {
    const createUserMock = vi.spyOn(usersStore, 'createUser').mockResolvedValueOnce(undefined)
    await wrapper.findComponent({ name: 'FormButtonComponent' }).vm.$emit('click')
    expect(createUserMock).toHaveBeenCalledWith(currentUserStore.currentUser.name, currentUserStore.currentUser.email, currentUserStore.currentUser.password)
  })

})