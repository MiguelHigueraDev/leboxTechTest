<template>
    <div>
        <div class="flex items-center gap-3">
            <BaseFormInputComponent :label="label" :modelValue="modelValue" :validator="passwordValidator"
                v-bind="attrs" :type="showPassword ? 'text' : 'password'" class="flex-grow" />
            <button @click="toggleShowPassword" type="button" class="p-2 mt-7 hover:bg-gray-200 rounded-md">
                <IconEye v-if="showPassword" size="24" />
                <IconEyeOff v-else size="24" />
            </button>
        </div>

        <span v-if="!isValidPassword" class="text-red-500 text-sm">
            La contraseña no es válida.
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'
import { computed } from 'vue'
import BaseFormInputComponent from './BaseFormInputComponent.vue'
import { IconEye, IconEyeOff } from '@tabler/icons-vue';

const attrs = useAttrs()

const showPassword = ref(false)

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

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const isValidPassword = computed(() => passwordValidator(props.modelValue))

// Emit the validity status of this component
watch(isValidPassword, (valid) => {
    emit('update:isValid', valid)
})

</script>