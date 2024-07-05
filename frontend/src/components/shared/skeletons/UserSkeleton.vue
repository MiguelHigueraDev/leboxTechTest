<!--
  Component: UserSkeleton
  Description: This component uses the AnimatedLoader component to create 
  a skeleton loader for each row in the user table.
-->

<template>
  <tr class="bg-white border-b">
    <th class="px-6 py-[18px] font-medium text-gray-900 whitespace-nowrap">
      <AnimatedLoader width="100px" height="20px" />
    </th>
    <td class="px-6 py-[18px] font-medium text-gray-900 whitespace-nowrap">
      <AnimatedLoader width="180px" height="20px" />
    </td>
    <td class="px-6 py-[18px] font-medium text-gray-900 whitespace-nowrap flex gap-3">
      <AnimatedLoader width="50px" height="32px" borderRadius="4px" />
      <AnimatedLoader width="70px" height="32px" borderRadius="4px" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import AnimatedLoader from './AnimatedLoader.vue'
</script>
