<template>
  <li
    class="p-4 rounded-md"
    :class="notification.type === 'success' ? 'bg-green-300' : 'bg-red-300'"
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
