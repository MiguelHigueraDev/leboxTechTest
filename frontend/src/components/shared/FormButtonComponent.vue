<template>
  <button type="button" :disabled="isLoading || isDisabled"
    class="w-full flex items-center justify-center gap-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    :class="{ 'cursor-not-allowed opacity-50': isLoading || isDisabled }" @click="$emit('click')">
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
}>()

defineEmits(['click'])
</script>
