<template>
    <table class='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead class='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
                <th scope='col' class='px-6 py-3'>Nombre</th>
                <th scope='col' class='px-6 py-3'>Email</th>
                <th scope='col' class='px-6 py-3'>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr class='bg-white border-b' v-for="user in users" :key="user.id">
                <th class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{{ user.name }}</th>
                <td class='px-6 py-4'>{{ user.email }}</td>
                <td class='px-6 py-4 flex gap-3'>
                    <button
                        class="edit p-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 rounded-md text-white font-semibold"
                        @click="$emit('edit', user)">Editar</button>
                    <button
                        class="delete p-2 bg-red-600 hover:bg-red-500 active:bg-red-400 rounded-md text-white font-semibold"
                        @click="$emit('delete', user.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="users.length === 0" class="text-center text-gray-500 py-4">
        No hay usuarios registrados.
    </div>
</template>

<script setup lang="ts">
import type { User } from '../../interfaces/User';

defineEmits(['edit', 'delete', 'fetchUsers'])

defineProps<{
    users: User[]
}>()
</script>