<template>
  <button
    @click="submitForm"
    class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    Iniciar sesión
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit'])

const submitForm = () => {
  emit('submit')
}
</script>
