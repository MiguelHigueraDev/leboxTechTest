<template>
    <div id="modal" tabindex="-1" :style="{ display: props.isVisible ? 'flex' : 'none' }"
        class="flex justify-center items-center fixed inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-50">
        <div :class="['relative p-4 w-full max-h-full', props.size]">
            <div class="relative bg-white rounded-lg shadow">
                <div class="flex px-5 pt-3 pb-1 items-center">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {{ props.title }}
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
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    isVisible: boolean,
    title: string,
    size: 'small' | 'medium' | 'large',
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
.small {
    max-width: 20rem;
}
.medium {
    max-width: 30rem;
}
.large {
    max-width: 42rem;
}
</style>