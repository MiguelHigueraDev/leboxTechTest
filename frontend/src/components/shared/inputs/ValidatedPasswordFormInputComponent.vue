<template>
    <div>
        <BaseFormInputComponent :label="label" :modelValue="modelValue" :validator="passwordValidator" type="email"
            v-bind="attrs" />
        <span v-if="!isValidPassword" class="text-red-500 text-sm">
            La contraseña no es válida.
        </span>
    </div>
</template>

<script setup lang="ts">
import { useAttrs, watch } from 'vue';
import { computed } from 'vue'
import BaseFormInputComponent from './BaseFormInputComponent.vue';

const attrs = useAttrs()

const props = defineProps<{
    label: string
    modelValue: string
    validator?: (value: string) => boolean
}>()

const emit = defineEmits(['update:isValid'])

const passwordValidator = (value: string): boolean => {
    // These are the same parameters that are in PasswordValidatorComponent.vue and the backend
    return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/).test(value);
}

const isValidPassword = computed(() => passwordValidator(props.modelValue))

// Emit the validity status of this component
watch(isValidPassword, (valid) => {
    emit('update:isValid', valid)
})

</script>