import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"

export const useVillagesStore = defineStore('villages', () => {
    /** @type {{value: Array.<Village>}} */
    const villages = ref([])

    const activeVillageId = ref(null)

    // Getters
    const activeVillage = () => {
        return villages.value.find(village => village.id == activeVillageId.value)
    }

    // Actions
    const setActiveVillage = async (id) => {
        activeVillageId.value = id

        return await storage.local.set({activeVillageId: id})
    }


    const fetch = async () => {
        const result = await executeOnActiveTab(async () => {
            let result = []

            document.querySelectorAll('.villageList .listEntry').forEach(el => {
                const coordsEl = el.querySelector('.coordinatesGrid')

                result.push({
                    name: el.querySelector('.name').innerHTML,
                    coordinates: {
                        x: +coordsEl.dataset.x,
                        y: +coordsEl.dataset.y,
                    },
                    id: +el.dataset.did,
                })
            })

            return result
        })

        villages.value = result

        if (! activeVillageId.value)
            await setActiveVillage(result[0]?.id)

        return await storage.local.set({villages: result})
    }

    const init = async () => {
        let data = await storage.local.get({villages: [], activeVillageId: null})

        if (data.villages && activeVillageId.value) {
            villages.value = data.villages
            activeVillageId.value = +data.activeVillageId
        } else {
            return await fetch()
        }

        return data
    }

    return {
        villages,

        activeVillage,

        setActiveVillage,
        init,
        fetch,
    }
})