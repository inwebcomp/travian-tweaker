<template>
    <div class="flex border-b-2">
        <div class="flex items-center justify-center px-2">
            <toggle :modelValue="enabled" @input="toggleEnabled"/>
        </div>
        <div class="flex items-center justify-center px-2">
            <select class="p-2 bg-transparent cursor-pointer" name="village" :value="activeVillage?.id" @input="changeActiveVillage">
                <option v-for="village in villages" :value="village.id">{{ village.name }}</option>
            </select>
        </div>
        <tab :to="{name: 'fields'}">Fields</tab>
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
import {computed, onBeforeMount, ref} from "vue"
import {useAppStore} from "@/stores/app"
import {useBuildingsStore} from "@/stores/buildings"
import {useVillagesStore} from "@/stores/villages"

export default {
    name: 'Navigation',
    components: {Toggle, Tab},

    async setup() {
        const app = useAppStore()
        const villagesStore = useVillagesStore()
        const buildingsStore = useBuildingsStore()

        const initApp = async () => {
            await app.init()
            await villagesStore.init()
            await buildingsStore.init()
        }

        // Init app
        await initApp()

        // Data
        const enabled = computed(() => app.enabled)
        const villages = computed(() => villagesStore.villages)
        const activeVillage = computed(villagesStore.activeVillage)

        // Actions
        const toggleEnabled = async (value) => {
            await app.setState(value)
        }

        return {
            enabled,
            toggleEnabled,
            villages,
            activeVillage,
        }
    },
}
</script>