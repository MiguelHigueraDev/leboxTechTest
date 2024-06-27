<template>
  <div class="max-w-7xl mx-auto h-screen">
    <!-- Add notifications in main layout so all the app can see them-->
    <NotificationsContainerComponent />
    <slot />
  </div>
</template>

<script setup lang="ts">
import NotificationsContainerComponent from '@/components/shared/NotificationsContainerComponent.vue'
</script>
