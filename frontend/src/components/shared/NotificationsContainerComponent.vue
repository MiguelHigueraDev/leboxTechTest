<!--
  Component: NotificationsContainerComponent
  Description: This component displays a list of notifications.
-->

<template>
  <div class="fixed right-2 top-2">
    <ul class="space-y-2">
      <NotificationComponent
        v-for="notification in sortedNotifications"
        :key="notification.id"
        :notification="notification"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import NotificationComponent from '@/components/shared/NotificationComponent.vue'
import { useNotificationStore } from '@/stores/notifications'
import { computed } from 'vue'

const notificationStore = useNotificationStore()

// Sort notifications so the newest ones are at the top
const sortedNotifications = computed(() => {
  return [...notificationStore.getNotifications].sort((a, b) => b.id - a.id)
})
</script>
