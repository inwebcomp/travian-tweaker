import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"

export const useAppStore = defineStore('app', () => {
    const enabled = ref(false)

    const setState = async (value) => {
        let data = await storage.local.set({enabled: value})
        enabled.value = value
    }

    const init = async () => {
        let data = await storage.local.get('enabled')
        enabled.value = data.enabled
    }

    return {
        enabled,

        setState,
        init,
    }
})