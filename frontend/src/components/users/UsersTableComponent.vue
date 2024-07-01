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
            <template v-if="loading">
                <UserSkeleton v-for="index in 15" :key="index" />
            </template>
            <tr v-else-if="!loading && usersData.users.length === 0" class='bg-white border-b'>
                <td class='px-6 py-4' colspan='3'>No hay usuarios registrados.</td>
            </tr>
            <tr v-else class='bg-white border-b' v-for="user in usersData.users" :key="user.id">
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

    <div class="flex justify-between w-full mt-3 items-center">
        <p>Mostrando usuarios <span class="font-semibold">{{ usersData.from }}</span> 
        a <span class="font-semibold">{{ usersData.to }}</span> de
        un total de <span class="font-semibold">{{ usersData.totalUsers }}</span></p>
        <div class="flex gap-2 flex-wrap">
            <button v-for="page in usersData.lastPage" :key="page" @click="$emit('fetchUsers', page)"
                :class="{ 'bg-blue-400 cursor-not-allowed': page === usersData.currentPage || loading }"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-400 rounded-md text-white font-semibold"
                :disabled="page === usersData.currentPage || loading">
                {{page}}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '../../interfaces/User';
import UserSkeleton from '../shared/skeletons/UserSkeleton.vue';

defineEmits(['edit', 'delete', 'fetchUsers'])

defineProps<{
    usersData: {
        users: User[],
        usersPerPage: number,
        currentPage: number,
        lastPage: number,
        totalUsers: number,
        from: number,
        to: number,
    },
    loading: boolean
}>()
</script>