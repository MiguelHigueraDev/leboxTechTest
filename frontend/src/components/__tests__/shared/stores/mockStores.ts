import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia';
import { vi } from 'vitest';

export const createMockStores = () => {
    const pinia = createTestingPinia({
        stubActions: false,
        createSpy: vi.fn,
    });
    setActivePinia(pinia);

    const authStore = {
        login: vi.fn(),
        logout: vi.fn(),
    }

    const notificationStore = {
        addNotification: vi.fn(),
        removeNotification: vi.fn(),
        clearNotifications: vi.fn(),
    }

    pinia.use(() => ({
        authStore: () => authStore,
        notificationStore: () => notificationStore,
    }))

    return {
        pinia,
        authStore,
        notificationStore,
    }
}