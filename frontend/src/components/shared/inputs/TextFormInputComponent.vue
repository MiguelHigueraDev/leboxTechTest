<!--
  Component: TextFormInputComponent
  Description: This component is a form input that validates the length of the input.
-->

<template>
  <div>
    <BaseFormInputComponent
      :label="label"
      :modelValue="modelValue"
      :validator="lengthValidator"
      type="email"
      v-bind="attrs"
    />
    <span v-if="!isValidLength" class="text-red-500 text-sm">
      El campo debe tener entre {{ props.minLength }} y {{ props.maxLength }} caracteres.
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useAttrs, watch } from 'vue'
import BaseFormInputComponent from './BaseFormInputComponent.vue'

const attrs = useAttrs()

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  validator: {
    type: Function,
    default: () => true
  },
  minLength: {
    type: Number,
    default: 1
  },
  maxLength: {
    type: Number,
    default: Infinity
  }
})

const emit = defineEmits(['update:isValid'])

const lengthValidator = (value: string): boolean => {
  return value.length >= props.minLength && value.length <= props.maxLength
}

const isValidLength = computed(() => lengthValidator(props.modelValue))

// Emit the validity status of this component
watch(isValidLength, (valid) => {
  emit('update:isValid', valid)
})

// Fixes rare edge case where the component is mounted with an invalid value
onMounted(() => {
  emit('update:isValid', isValidLength.value)
})
</script>
