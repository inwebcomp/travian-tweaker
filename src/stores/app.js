import {defineStore} from "pinia"
import {reactive, ref} from "vue"
import {Nation} from "@/composables/enums"
import storage from "@/composables/storage"

export const useAppStore = defineStore('app', () => {
    const enabled = ref(false)
    const speed = ref(1)
    const plus = ref(true)
    const nation = ref(Nation.Gaul)
    const watchAds = ref(true)
    const serverUrl = ref('https://ts4.x1.europe.travian.com')

    const config = reactive({
        watchAttacks: false,
        notificationsKey: null,
    })

    const setState = async (value) => {
        let data = await storage.set('enabled', value)
        enabled.value = value

        chrome.runtime.sendMessage({type: 'toggle-app-state', data: value})
    }

    const saveConfig = async (key, value) => {
        config[key] = value
        await storage.set(key, value)
    }

    const init = async () => {
        let enabled = await storage.get('enabled')
        await setState(enabled)

        for (const key of Object.keys(config)) {
            config[key] = await storage.get(key)
        }
    }

    return {
        enabled,
        speed,
        plus,
        nation,
        watchAds,
        serverUrl,

        config,

        setState,
        saveConfig,
        init,
    }
})