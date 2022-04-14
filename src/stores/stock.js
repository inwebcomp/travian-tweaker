import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"
import Resource from "@/elements/Resource"

export const useStockStore = defineStore('stock', () => {
    const resources = ref([])

    const fetch = async () => {
        let result = await executeOnActiveTab(async () => {
            const {Resource, getInt} = $th

            const warehouseLimit = getInt(document.querySelector('#stockBar .warehouse .capacity .value').innerText)
            const granaryLimit = getInt(document.querySelector('#stockBar .granary .capacity .value').innerText)

            const result = [
                new Resource({
                    type: Resource.Wood,
                    amount: getInt(document.querySelector('#l1').innerText),
                    limit: warehouseLimit,
                    produce: getInt(document.querySelector("#production tr:nth-child(1) .num").innerText),
                }),
                new Resource({
                    type: Resource.Clay,
                    amount: getInt(document.querySelector('#l2').innerText),
                    limit: warehouseLimit,
                    produce: getInt(document.querySelector("#production tr:nth-child(2) .num").innerText),
                }),
                new Resource({
                    type: Resource.Iron,
                    amount: getInt(document.querySelector('#l3').innerText),
                    limit: warehouseLimit,
                    produce: getInt(document.querySelector("#production tr:nth-child(3) .num").innerText),
                }),
                new Resource({
                    type: Resource.Crop,
                    amount: getInt(document.querySelector('#l4').innerText),
                    limit: granaryLimit,
                    produce: getInt(document.querySelector("#production tr:nth-child(4) .num").innerText),
                }),
            ]

            return result
        }, null)

        if (! result)
            return

        resources.value = result

        return await storage.local.set({resources: result})
    }

    const init = async () => {
        let data = await storage.local.get({resources: []})

        if (data.resources) {
            resources.value = data.resources
        } else {
            return await fetch()
        }

        return data
    }

    return {
        resources,

        init,
        fetch,
    }
})