<!--
  View for the dashboard. It displays the users table and the buttons to create a new user and logout.
-->

<template>
  <main style="height: calc(100% - 44)">
    <div
      class="mt-3 mx-auto max-w-4xl bg-white rounded-lg xl:p-0 flex flex-col items-center justify-center"
    >
      <div class="flex flex-col md:flex-row gap-4 p-5 justify-between w-full items-center">
        <h1 class="flex-grow text-2xl font-bold my-5">Sistema de Gestión de Usuarios</h1>
        <LogoutButtonComponent />
      </div>

      <FormButtonComponent
        label="Crear usuario nuevo"
        :isLoading="false"
        :isDisabled="false"
        type="success"
        class="my-6"
        @click="openCreateModal"
      />

      <UsersTableComponent
        :usersData="users as any"
        :loading="loadingUsers"
        @delete="openDeletionConfirmation"
        @edit="openEditModal"
        @fetchUsers="fetchUsers"
      />

      <UserModal
        :isVisible="isUserModalVisible"
        :operation="currentOperation"
        @close="closeUserModal"
      />
      <DeleteConfirmationModal
        :userIdForDeletion="userIdForDeletion"
        :isVisible="isDeleteConfirmationModalVisible"
        @close="closeDeleteConfirmationModal"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'
import UserModal from '@/components/modals/UserModal.vue'
import FormButtonComponent from '@/components/shared/FormButtonComponent.vue'
import LogoutButtonComponent from '@/components/shared/LogoutButtonComponent.vue'
import UsersTableComponent from '@/components/users/UsersTableComponent.vue'
import { type User } from '@/interfaces/User'
import { useCurrentUserStore } from '@/stores/currentUser'
import { useUsersStore } from '@/stores/usersStore'
import { onMounted, ref, type Ref } from 'vue'

const currentUser = useCurrentUserStore()
const users = useUsersStore()

const currentOperation: Ref<'create' | 'edit'> = ref('create')
const userIdForDeletion: Ref<number | null> = ref(null)
const isUserModalVisible: Ref<boolean> = ref(false)
const isDeleteConfirmationModalVisible: Ref<boolean> = ref(false)
const loadingUsers: Ref<boolean> = ref(false)

// Create
const openCreateModal = () => {
  currentOperation.value = 'create'
  currentUser.setCurrentUserEmail('')
  currentUser.setCurrentUserName('')
  currentUser.setCurrentUserPassword('')
  isUserModalVisible.value = true
}

// Edit
const openEditModal = (user: User) => {
  currentOperation.value = 'edit'
  currentUser.setCurrentUserId(user.id!)
  currentUser.setCurrentUserEmail(user.email)
  currentUser.setCurrentUserName(user.name)
  currentUser.setCurrentUserPassword('')
  isUserModalVisible.value = true
}

const closeUserModal = () => {
  isUserModalVisible.value = false
}

// Deletion
const openDeletionConfirmation = (userId: number) => {
  userIdForDeletion.value = userId
  isDeleteConfirmationModalVisible.value = true
}

const closeDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = false
}

const fetchUsers = async (page: number) => {
  users.clearUsers()
  loadingUsers.value = true
  await users.fetchUsers(page)
  loadingUsers.value = false
}

onMounted(() => {
  fetchUsers(1)
})
</script>
