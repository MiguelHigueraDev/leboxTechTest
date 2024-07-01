<template>
    <div class="flex flex-col-reverse sm:flex-row">
        <div class="p-4 md:p-5 sm:w-2/3">
            <form class="space-y-4" @submit.prevent="createOrUpdateUser">
                <TextFormInputComponent :max-length="255" :min-length="3" label="Nombre" placeholder="Juan Pérez"
                    type="text" :modelValue="currentUser.name" @update:isValid="updateNameValidity"
                    @update:modelValue="(name: string) => updateCurrentUser('name', name)" />
                <EmailFormInputComponent label="Correo" placeholder="correo@dominio.com" type="email"
                    :modelValue="currentUser.email" @update:isValid="updateEmailValidity"
                    @update:modelValue="(email: string) => updateCurrentUser('email', email)" />
                <ValidatedPasswordFormInputComponent label="Contraseña" placeholder="********" type="password"
                    :modelValue="currentUser.password" @update:isValid="updatePasswordValidity"
                    @update:modelValue="(password: string) => updateCurrentUser('password', password)" />
                <FormButtonComponent :isLoading="isLoading" type="success"
                    :isDisabled="!isNameValid || !isEmailValid || !isPasswordValid" :label="buttonLabel"
                    @click="createOrUpdateUser" />
            </form>
        </div>
        <div class="p-4 md:p-5 sm:w-1/3">
            <PasswordValidityComponent :password="currentUser.password" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import FormButtonComponent from '../shared/FormButtonComponent.vue';
import PasswordValidityComponent from '../users/PasswordValidityComponent.vue';
import EmailFormInputComponent from '../shared/inputs/EmailFormInputComponent.vue';
import TextFormInputComponent from '../shared/inputs/TextFormInputComponent.vue';
import ValidatedPasswordFormInputComponent from '../shared/inputs/ValidatedPasswordFormInputComponent.vue';
import { useCurrentUserStore } from '@/stores/currentUser';
import { useUsersStore } from '@/stores/usersStore';

const currentUser = useCurrentUserStore();
const users = useUsersStore();

const props = defineProps<{
    isVisible: boolean,
    operation: 'create' | 'edit',
}>();

const emit = defineEmits(['close', 'update']);

const isLoading = ref(false);

const buttonLabel = computed(() => {
    return props.operation === 'create' ? 'Crear usuario' : 'Guardar cambios';
});

// Store the validity of each field to prevent the form from being submitted if any of them is invalid
const isNameValid = ref(false);
const isEmailValid = ref(false);
const isPasswordValid = ref(false);

const updateCurrentUser = (field: 'name' | 'email' | 'password', value: string) => {
    if (field === 'password') {
        currentUser.setCurrentUserPassword(value);
    } else if (field === 'email') {
        currentUser.setCurrentUserEmail(value);
    } else {
        currentUser.setCurrentUserName(value);
    }
};

const updateNameValidity = (valid: boolean) => {
    isNameValid.value = valid;
};
const updateEmailValidity = (valid: boolean) => {
    isEmailValid.value = valid;
};
const updatePasswordValidity = (valid: boolean) => {
    isPasswordValid.value = valid;
};

const createOrUpdateUser = async () => {
    isLoading.value = true;
    if (props.operation === 'create') {
        await createUser();
    } else {
        await updateUser();
    }
    isLoading.value = false;
    emit('close'); // Close the modal after completing operation
};

const createUser = async () => {
    await users.createUser(currentUser.name, currentUser.email, currentUser.password);
};

const updateUser = async () => {
    await users.updateUser(currentUser.id,
        currentUser.name,
        currentUser.email,
        currentUser.password);
};

</script>