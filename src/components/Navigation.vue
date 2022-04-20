<template>
    <div class="flex border-b-2">
        <div class="flex items-center justify-center px-2">
            <toggle :modelValue="enabled" @input="toggleEnabled"/>
        </div>
        <div class="flex items-center justify-center px-2">
            <select class="p-2 bg-transparent cursor-pointer" name="village" :value="activeVillage?.id"
                    @input="changeActiveVillage">
                <option v-for="village in villages" :value="village.id">{{ village.name }}</option>
            </select>
        </div>
        <tab :to="{name: 'fields'}">Fields</tab>
        <tab :to="{name: 'buildings'}">Buildings</tab>
        <tab :to="{name: 'movements'}">Movements</tab>
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
import {computed, onMounted} from "vue"
import {useAppStore} from "@/stores/app"
import {useBuildingsStore} from "@/stores/buildings"
import {useVillagesStore} from "@/stores/villages"
import {onPageLoad, registerPageLoadWatcher} from "@/composables/app"
import {useFieldsStore} from "@/stores/fields"
import {useActionsStore} from "@/stores/actions"
import {useQueueStore} from "@/stores/queue"

export default {
    name: 'Navigation',
    components: {Toggle, Tab},

    async setup() {
        const app = useAppStore()
        const villagesStore = useVillagesStore()
        const buildingsStore = useBuildingsStore()
        const fieldsStore = useFieldsStore()
        const actionsStore = useActionsStore()
        const queueStore = useQueueStore()

        const initApp = async () => {
            await app.init()
            await villagesStore.init()
            await fieldsStore.init()
            await buildingsStore.init()
            await queueStore.init()
        }

        // Init app
        await initApp()

        registerPageLoadWatcher()

        onPageLoad(async () => {
            await villagesStore.fetch()
            await villagesStore.fetch()
            await fieldsStore.fetch()
            await buildingsStore.fetch()
            await actionsStore.fetch()
        })

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