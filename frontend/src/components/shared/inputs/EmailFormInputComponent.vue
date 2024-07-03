<!--
  Component: EmailFormInputComponent
  Description: This component is a form input that validates an email.
-->

<template>
    <div>
        <BaseFormInputComponent :label="label" :modelValue="modelValue" :validator="emailValidator" type="email"
            v-bind="attrs" />
        <span v-if="!isValidEmail" class="text-red-500 text-sm">
            Por favor ingrese un email válido.
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useAttrs, watch } from 'vue'
import BaseFormInputComponent from './BaseFormInputComponent.vue';

const attrs = useAttrs()

const props = defineProps<{
    label: string
    modelValue: string
    validator?: (value: string) => boolean
}>()

const emit = defineEmits(['update:isValid'])

const emailValidator = (value: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(value)
}

const isValidEmail = computed(() => emailValidator(props.modelValue))

watch(isValidEmail, (valid) => {
    emit('update:isValid', valid)
})

// Fixes rare edge case where the component is mounted with an invalid value
onMounted(() => {
    emit('update:isValid', isValidEmail.value)
})

</script>