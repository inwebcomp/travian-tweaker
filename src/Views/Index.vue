<template>
    <div class="bg-gray-100 p-2">
        <div>
            <div class="font-bold mb-1 text-sm">{{ ('Notifications') }}</div>

            <div class="flex flex-col gap-2">
                <div class="flex">
                    <div>{{ ('Watch for attacks') }}</div>
                    <div class="flex items-center justify-center px-2">
                        <toggle :modelValue="config.watchAttacks" @input="saveConfig('watchAttacks', $event)"/>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="w-full">
                        <div class="mb-1">
                            <a class="underline text-blue-500" target="_blank" href="https://play.google.com/store/apps/details?id=net.xdroid.pn&hl=ru&gl=US">Push Notification API</a> Key:
                        </div>
                        <input type="text" class="border rounded p-1 w-full"
                               :value="config.notificationsKey"
                               @change="saveConfig('notificationsKey', $event.target.value)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Toggle from '@vueform/toggle'
import {useAppStore} from "@/stores/app"
import {computed} from "vue"

export default {
    name: "Index",
    components: {Toggle},

    async setup() {
        const app = useAppStore()

        // Data
        const enabled = computed(() => app.enabled)
        const config = computed(() => app.config)

        // Actions
        const toggleEnabled = async (value) => {
            await app.setState(value)
        }
        const saveConfig = async (key, value) => {
            await app.saveConfig(key, value)
        }

        return {
            enabled,
            config,

            toggleEnabled,
            saveConfig,
        }
    },
}
</script>