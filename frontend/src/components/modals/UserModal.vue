<template>
    <div id="authentication-modal" tabindex="-1" :style="{ display: props.isVisible ? 'flex' : 'none' }"
        class="flex justify-center items-center fixed inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-50">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {{ props.operation === 'create' ? 'Crear usuario nuevo' : 'Editar usuario' }}
                    </h3>
                    <button type="button" @click="closeModal"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Cerrar ventana</span>
                    </button>
                </div>
                <UserFormComponent :isVisible="props.isVisible" :operation="props.operation" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import UserFormComponent from '@/components/users/UserFormComponent.vue';

const props = defineProps<{
    isVisible: boolean,
    operation: 'create' | 'edit',
}>();

const emit = defineEmits(['close', 'update']);

const closeModal = () => {
    emit('close');
};

</script>