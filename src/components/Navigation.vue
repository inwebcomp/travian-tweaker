<template>
    <div class="flex border-b-2">
        <div class="flex items-center justify-center px-2">
            <toggle :modelValue="enabled" @input="toggleEnabled"/>
        </div>
        <tab :to="{name: 'buildings'}">Buildings</tab>
        <tab>Movements</tab>
        <tab>Notifications</tab>
    </div>
</template>

<style src="@vueform/toggle/themes/default.css"></style>
<style>
    .toggle-container:focus {
        box-shadow: none;
    }
</style>

<script>
import Toggle from '@vueform/toggle'
import Tab from "@/components/Tab"
import {computed, ref} from "vue"
import {useAppStore} from "@/stores/app"

export default {
    name: 'Navigation',
    components: {Toggle, Tab},

    async setup() {
        const app = useAppStore()
        await app.init()

        const enabled = computed(() => app.enabled)

        const toggleEnabled = async (value) => {
            await app.setState(value)
        }

        return {
            enabled,
            toggleEnabled,
        }
    },
}
</script>