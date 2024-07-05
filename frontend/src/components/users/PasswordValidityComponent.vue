<!--
  Component: PasswordValidityComponent
  Description: This component displays a list of password requirements and checks if the password meets them.
-->

<template>
  <div class="flex flex-col justify-center gap-2 h-full">
    <label class="block text-sm font-medium text-gray-900">Requisitos contraseña</label>
    <ul>
      <li
        class="flex items-center gap-1"
        :class="{ 'text-green-700': lengthValid, 'text-red-600': !lengthValid }"
      >
        <IconCheck v-if="lengthValid" size="16" class="check-icon" />
        <IconX v-else size="16" class="x-icon" />
        <span>8-32 caracteres</span>
      </li>
      <li
        class="flex items-center gap-1"
        :class="{ 'text-green-700': lowercaseValid, 'text-red-600': !lowercaseValid }"
      >
        <IconCheck v-if="lowercaseValid" size="16" class="check-icon" />
        <IconX v-else size="16" class="x-icon" />
        <span>Una letra minúscula</span>
      </li>
      <li
        class="flex items-center gap-1"
        :class="{ 'text-green-700': uppercaseValid, 'text-red-600': !uppercaseValid }"
      >
        <IconCheck v-if="uppercaseValid" size="16" class="check-icon" />
        <IconX v-else size="16" class="x-icon" />
        <span>Una letra mayúscula</span>
      </li>
      <li
        class="flex items-center gap-1"
        :class="{ 'text-green-700': numberValid, 'text-red-600': !numberValid }"
      >
        <IconCheck v-if="numberValid" size="16" class="check-icon" />
        <IconX v-else size="16" class="x-icon" />
        <span>Un número</span>
      </li>
      <li
        class="flex items-center gap-1"
        :class="{ 'text-green-700': symbolValid, 'text-red-600': !symbolValid }"
      >
        <IconCheck v-if="symbolValid" size="16" class="check-icon" />
        <IconX v-else size="16" class="x-icon" />
        <span>Un símbolo de la lista</span>
      </li>
      <li class="text-gray-800 text-center"># ? ! @ $ % ^ & * -</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IconCheck, IconX } from '@tabler/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  password: string
}>()

const lengthValid = computed(() => props.password.length >= 8 && props.password.length <= 32)
const lowercaseValid = computed(() => /[a-z]/.test(props.password))
const uppercaseValid = computed(() => /[A-Z]/.test(props.password))
const numberValid = computed(() => /[0-9]/.test(props.password))
const symbolValid = computed(() => /[#?!@$%^&*-]/.test(props.password))
</script>
