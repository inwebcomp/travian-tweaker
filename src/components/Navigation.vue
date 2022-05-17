<template>
    <div class="flex border-b-2">
        <div class="flex items-center justify-center px-2">
            <toggle :modelValue="enabled" @input="toggleEnabled"/>
        </div>
        <tab :to="{name: 'index'}">UI</tab>
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
import {computed} from "vue"
import {useAppStore} from "@/stores/app"
import {onPageLoad, registerPageLoadWatcher} from "@/composables/app"

export default {
    name: 'Navigation',
    components: {Toggle, Tab},

    async setup() {
        const app = useAppStore()

        const initApp = async () => {
            await app.init()
        }

        // Init app
        await initApp()

        registerPageLoadWatcher()

        onPageLoad(async () => {
            //
        })

        // Data
        const enabled = computed(() => app.enabled)

        // Actions
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