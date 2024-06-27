<template>
  <button
    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    @click="logout"
  >
    Cerrar sesión
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'

const authStore = useAuthStore()
const notifications = useNotificationStore()

const logout = () => {
  authStore.logout()
  notifications.addNotification('Cierre de sesión exitoso.', 'success')
}
</script>
