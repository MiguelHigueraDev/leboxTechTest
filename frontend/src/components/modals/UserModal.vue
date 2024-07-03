<!--
  Component: UserModal
  Description: This component is a modal that displays the user form for creating or editing a user.
-->

<template>
    <BaseModal size="large" :isVisible="isVisible" :title="operation === 'create' ? 'Crear usuario nuevo' : 'Editar usuario'"
        @close="closeModal">
        <UserFormComponent :isVisible="isVisible" :operation="operation" @close="closeModal" />
    </BaseModal>
</template>

<script setup lang='ts'>
import UserFormComponent from '@/components/users/UserFormComponent.vue';
import BaseModal from '@/components/modals/BaseModal.vue';

defineProps<{
    isVisible: boolean,
    operation: 'create' | 'edit',
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>