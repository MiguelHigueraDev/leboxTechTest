<template>
    <BaseModal size="large" :isVisible="isVisible" :title="operation === 'create' ? 'Crear usuario nuevo' : 'Editar usuario'"
        @close="closeModal">
        <UserFormComponent :isVisible="isVisible" :operation="operation" />
    </BaseModal>
</template>

<script setup lang='ts'>
import UserFormComponent from '@/components/users/UserFormComponent.vue';
import BaseModal from '@/components/modals/BaseModal.vue';

const props = defineProps<{
    isVisible: boolean,
    operation: 'create' | 'edit',
}>();

const emit = defineEmits(['close', 'update']);

const closeModal = () => {
    emit('close');
};
</script>