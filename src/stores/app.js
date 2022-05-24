import {defineStore} from "pinia"
import {ref} from "vue"
import {Nation} from "@/composables/enums"
import storage from "@/composables/storage"

export const useAppStore = defineStore('app', () => {
    const enabled = ref(false)
    const speed = ref(1)
    const plus = ref(true)
    const nation = ref(Nation.Gaul)
    const watchAds = ref(true)
    const serverUrl = ref('https://ts4.x1.europe.travian.com')

    const setState = async (value) => {
        let data = await storage.set('enabled', value)
        enabled.value = value

        chrome.runtime.sendMessage({type: 'toggle-app-state', data: value})
    }

    const init = async () => {
        let enabled = await storage.get('enabled')
        await setState(enabled)
    }

    return {
        enabled,
        speed,
        plus,
        nation,
        watchAds,
        serverUrl,

        setState,
        init,
    }
})