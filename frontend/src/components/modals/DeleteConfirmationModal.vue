<template>
    <BaseModal size="medium" :isVisible="isVisible" title="Confirmar eliminación" @close="closeModal">
        <div class="p-4 placeholder-opacity-30">
            <p class="mt-2 mb-5">Se eliminará permanentemente el usuario.</p>
            <FormButtonComponent :isLoading="isLoading" type="danger" label="Eliminar usuario"
                @click="emit('deleteUser')" />
        </div>
    </BaseModal>
</template>

<script setup lang='ts'>
import BaseModal from '@/components/modals/BaseModal.vue';
import FormButtonComponent from '../shared/FormButtonComponent.vue';

defineProps<{
    isVisible: boolean,
    isLoading: boolean,
}>();

const emit = defineEmits(['close', 'deleteUser']);

const closeModal = () => {
    emit('close');
};
</script>