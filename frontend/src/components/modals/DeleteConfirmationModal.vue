<!--
  Component: DeleteConfirmationModal
  Description: This component is a modal that asks the user to confirm the deletion of a user.
-->

<template>
    <BaseModal size="medium" :isVisible="isVisible" title="Confirmar eliminación" @close="closeModal">
        <div class="p-4 placeholder-opacity-30">
            <p class="mt-2 mb-5">Se eliminará permanentemente el usuario.</p>
            <FormButtonComponent :isLoading="deletionInProgress" type="danger" label="Eliminar usuario"
                @click="deleteUser" />
        </div>
    </BaseModal>
</template>

<script setup lang='ts'>
import BaseModal from '@/components/modals/BaseModal.vue';
import FormButtonComponent from '../shared/FormButtonComponent.vue';
import { ref, type Ref } from 'vue';
import { useUsersStore } from '@/stores/usersStore';

const users = useUsersStore();

const deletionInProgress: Ref<boolean> = ref(false);

const props = defineProps<{
    isVisible: boolean,
    userIdForDeletion: number | null,
}>();

const emit = defineEmits(['close', 'deleteUser']);

const deleteUser = async () => {
    deletionInProgress.value = true;
    await users.deleteUser(props.userIdForDeletion!);
    deletionInProgress.value = false;
    closeModal();
};

const closeModal = () => {
    emit('close');
};

</script>