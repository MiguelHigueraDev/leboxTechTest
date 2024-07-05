<!--
  Component: AnimatedLoader
  Description: This component is a skeleton loader that animates a gradient background. 
  It can be used to indicate that a component is loading.
-->

<template>
  <div class="skeleton"></div>
</template>

<script setup lang="ts">
defineProps<{
  height?: string
  width?: string
  borderRadius?: string
}>()
</script>

<style scoped>
.skeleton {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  background-image: linear-gradient(to right, #d6d7d8 0%, #e2e3e4 10%, #d6d7d8 20%, #d6d7d8 100%);
  background-size: 200% 100%;
  animation-name: loading;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes loading {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
</style>
