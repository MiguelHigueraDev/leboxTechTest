<template>
  <button type="submit" :disabled="isLoading || isDisabled"
    class="form-button w-full flex items-center justify-center gap-4 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    :class="{
      'cursor-not-allowed opacity-50': isLoading || isDisabled,
      success: type === 'success',
      warning: type === 'warning',
      danger: type === 'danger'
    }" @click="$emit('click')">
    <LoadingSpinner v-if="isLoading" size="20" />
    <span v-if="!isLoading">{{ label }}</span>
    <span v-else>Cargando...</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

defineProps<{
  isLoading: boolean
  isDisabled?: boolean
  label: string
  type: 'success' | 'warning' | 'danger'
}>()

defineEmits(['click'])
</script>

<style scoped>
.success {
  background-color: rgb(21 128 61);
}

.success:hover {
  background-color: rgb(16 100 47);
}

.warning {
  background-color: rgb(255 193 7);
}

.warning:hover {
  background-color: rgb(255 183 7);
}

.danger {
  background-color: rgb(220 38 38);
}

.danger:hover {
  background-color: rgb(185 28 28);
}
</style>