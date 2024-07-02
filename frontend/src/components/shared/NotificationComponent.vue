<template>
  <li
    class="p-4 rounded-md border-l-8 shadow-lg drop-shadow-lg'"
    :class="notification.type === 'success' ? 'border-green-400' : 'border-red-400'"
  >
    {{ notification.message }}
  </li>
</template>

<script setup lang="ts">
import type { Notification } from '@/stores/notifications'

defineProps<{
  notification: Notification
}>()
</script>
