<!--
  Component: AppFeaturesComponent
  Description: This component displays the features of the application, it is used in the login page.
-->
<template>
  <div>
    <h2 class="mb-6 font-bold text-2xl">Sistema de gestión de usuarios</h2>
    <ul class="space-y-3">
      <li>
        <div class="flex gap-2 items-center text-lg font-semibold">
          <IconHome width="20" /> <span>Acceso centralizado</span>
        </div>
        <div class="text-md text-neutral-700">
          Controle todos sus usuarios desde una sola plataforma.
        </div>
      </li>
      <li>
        <div class="flex gap-2 items-center text-lg font-semibold">
          <IconDeviceMobile width="20" /> <span>Multiplataforma</span>
        </div>
        <div class="text-md text-neutral-700">
          Acceda desde su navegador favorito, sea PC o móvil.
        </div>
      </li>
      <li>
        <div class="flex gap-2 items-center text-lg font-semibold">
          <IconLock width="20" /> <span>Seguro</span>
        </div>
        <div class="text-md text-neutral-700">
          El inicio de sesión es seguro y sus contraseñas están encriptadas.
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IconHome, IconLock, IconDeviceMobile } from '@tabler/icons-vue'
</script>
