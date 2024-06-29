<template>
  <div class="flex flex-col gap-2">
    <label class="block text-sm font-medium text-gray-900">{{ label }}</label>
    <input :type="(attrs.type as InputTypeHTMLAttribute) || 'text'" :value="modelValue" @input="onInput"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:outline-none focus:border-green-600 block w-full p-2.5"
      v-bind="attrs" />
    <span v-if="isEmailInvalid" class="text-red-600 text-sm">Por favor ingrese una dirección de correo correcta.</span>
  </div>
</template>

<script setup lang="ts">
import { computed, type InputTypeHTMLAttribute } from 'vue'
import { useAttrs } from 'vue'

const props = defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const isEmailInvalid = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return attrs.type === 'email' && props.modelValue !== '' && !emailPattern.test(props.modelValue)
})
</script>