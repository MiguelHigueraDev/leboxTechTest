<template>
  <main style="height: calc(100% - 44)">
    <div
      class="mt-3 mx-auto max-w-4xl bg-white rounded-lg xl:p-0 flex flex-col items-center justify-center"
    >
      <div class="flex flex-col md:flex-row justify-between w-full items-center">
        <h1 class="flex-grow text-2xl font-bold">Sistema de Gestión de Usuarios</h1>
        <LogoutButtonComponent />
      </div>
    </div>
  </main>
</template>

<script setup>
import LogoutButtonComponent from '@/components/shared/LogoutButtonComponent.vue'
import { useNotificationStore } from '@/stores/notifications'

const notifications = useNotificationStore()
</script>
