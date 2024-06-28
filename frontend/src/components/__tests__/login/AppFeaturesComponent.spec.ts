import AppFeaturesComponent from "@/components/login/AppFeaturesComponent.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('AppFeaturesComponent', () => {
    it('renders the app features component', () => {
        const wrapper = mount(AppFeaturesComponent)

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('h2').text()).toBe("Sistema de gestión de usuarios")
    })
})