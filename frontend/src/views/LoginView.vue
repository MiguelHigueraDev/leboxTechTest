<template>
  <main style="height: calc(100% - 44px)">
    <div
      class="h-full mx-auto max-w-4xl bg-white rounded-lg md:mt-0 xl:p-0 flex flex-col items-center justify-center"
    >
      <div class="p-6 space-y-4 shadow-md md:space-y-6 sm:p-8 md:flex gap-20 w-full">
        <!-- Application "feature" list -->
        <AppFeaturesComponent />

        <form class="space-y-4 md:space-y-6 w-full">
          <h3 class="text-xl font-semibold">Ingrese al sistema</h3>
          <FormInputComponent
            label="Email"
            type="email"
            v-model="email"
            @update="(val) => (email = val)"
          />
          <FormInputComponent
            label="Contraseña"
            type="password"
            v-model="password"
            @update="(val) => (password = val)"
          />
          <FormButtonComponent @click.prevent="handleSubmit" />
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import FormInputComponent from '@/components/shared/FormInputComponent.vue'
import FormButtonComponent from '@/components/shared/FormButtonComponent.vue'
import AppFeaturesComponent from '@/components/login/AppFeaturesComponent.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const email = ref('default@example.com')
const password = ref('password')

const handleSubmit = () => {
  const authStore = useAuthStore()
  console.log(authStore.login(email.value, password.value))
}
</script>
