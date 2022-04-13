import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"

export const useBuildingsStore = defineStore('buildings', () => {
    const buildings = ref([])

    const fetch = async () => {
        const result = await executeOnActiveTab(async () => {
            let result = []

            document.querySelectorAll('.buildingSlot').forEach((item, i) => {
                if (! item.dataset.name)
                    return

                result.push({
                    title: item.dataset.name,
                    place: item.dataset.aid,
                    level: item.querySelector('.labelLayer')?.innerText,
                    link: item.querySelector('a')?.getAttribute('href'),
                })
            })

            return result
        })

        buildings.value = result

        return await storage.local.set({buildings: result})
    }

    const init = async () => {
        let data = await storage.local.get('buildings')
        buildings.value = data.enabled
        return data
    }

    return {
        buildings,

        init,
        fetch,
    }
})