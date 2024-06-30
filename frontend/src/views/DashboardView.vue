<template>
  <main style="height: calc(100% - 44)">
    <div class="mt-3 mx-auto max-w-4xl bg-white rounded-lg xl:p-0 flex flex-col items-center justify-center">
      <div class="flex flex-col md:flex-row justify-between w-full items-center mb-6">
        <h1 class="flex-grow text-2xl font-bold">Sistema de Gestión de Usuarios</h1>
        <LogoutButtonComponent />
      </div>

      <UsersTableComponent :users="users" @delete="openDeletionConfirmation" @edit="openEditModal" />
      <FormButtonComponent label="Crear usuario nuevo" :isLoading="false" :isDisabled="false" type="success"
        class="mt-4" @click="openCreateModal" />

      <UserModal :isVisible="isUserModalVisible" :operation="currentOperation" @close="closeUserModal" />
      <DeleteConfirmationModal :isVisible="isDeleteConfirmationModalVisible" @close="closeDeleteConfirmationModal"
        @deleteUser="deleteUser" :isLoading="deletionInProgress" />
    </div>
  </main>
</template>

<script setup lang="ts">
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue';
import UserModal from '@/components/modals/UserModal.vue';
import FormButtonComponent from '@/components/shared/FormButtonComponent.vue';
import LogoutButtonComponent from '@/components/shared/LogoutButtonComponent.vue';
import UsersTableComponent from '@/components/users/UsersTableComponent.vue';
import { fetchWrapper } from '@/helpers/fetchWrapper';
import { type User } from '@/interfaces/User';
import { useCurrentUserStore } from '@/stores/currentUser';
import { useNotificationStore } from '@/stores/notifications';
import { onMounted, ref, type Ref } from 'vue';

const notifications = useNotificationStore();
const currentUser = useCurrentUserStore();

const users: Ref<User[]> = ref([]);
const currentOperation: Ref<'create' | 'edit'> = ref('create');
const userIdForDeletion: Ref<number | null> = ref(null);
const deletionInProgress: Ref<boolean> = ref(false);
const isUserModalVisible: Ref<boolean> = ref(false);
const isDeleteConfirmationModalVisible: Ref<boolean> = ref(false);

const fetchUsers = async () => {
  try {
    const fetchedUsers = await fetchWrapper.get('http://localhost:8000/api/users');
    users.value = fetchedUsers.data;
  } catch (error) {
    notifications.addNotification('Ocurrió un error al cargar los usuarios.', 'error');
  }
};

// Create
const openCreateModal = () => {
  currentOperation.value = 'create';
  currentUser.setCurrentUserEmail("");
  currentUser.setCurrentUserName("");
  currentUser.setCurrentUserPassword("");
  isUserModalVisible.value = true;
};

// Edit
const openEditModal = (user: User) => {
  currentOperation.value = 'edit';
  currentUser.setCurrentUserId(user.id!);
  currentUser.setCurrentUserEmail(user.email);
  currentUser.setCurrentUserName(user.name);
  currentUser.setCurrentUserPassword("");
  isUserModalVisible.value = true;
};

const closeUserModal = () => {
  isUserModalVisible.value = false;
};

// Deletion
const openDeletionConfirmation = (userId: number) => {
  userIdForDeletion.value = userId;
  isDeleteConfirmationModalVisible.value = true;
};

const closeDeleteConfirmationModal = () => {
  isDeleteConfirmationModalVisible.value = false;
};

const deleteUser = async () => {
  try {
    deletionInProgress.value = true;
    await fetchWrapper.delete(`http://localhost:8000/api/users/${userIdForDeletion.value}`);
    users.value = users.value.filter(user => user.id !== userIdForDeletion.value);
    notifications.addNotification('Usuario eliminado correctamente.', 'success');
  } catch (error) {
    notifications.addNotification('Ocurrió un error al eliminar el usuario.', 'error');
  }
  isDeleteConfirmationModalVisible.value = false;
  deletionInProgress.value = false;
};

onMounted(() => {
  fetchUsers();
});
</script>