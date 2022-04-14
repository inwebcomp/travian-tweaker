import {defineStore} from "pinia"
import {reactive, ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"
import {parseBuildingInfo} from "@/composables/parser"

export const useBuildingsStore = defineStore('buildings', () => {
    const buildings = ref([])
    let totalInfo = reactive({data: {}})

    const info = (building, forLevel = null) => {
        if (forLevel === true)
            forLevel = building.level

        console.log('in info', totalInfo.data)
// return {}
        if (forLevel !== null)
            return totalInfo.data[building.gid]?.find(item => item.level == forLevel)

        return totalInfo.data[building.gid]
    }

    const fetch = async (redirectIfNeeded = false) => {
        const result = await executeOnActiveTab(async () => {
            let result = []

            let addedIds = []

            document.querySelectorAll('.buildingSlot').forEach((item, i) => {
                if (!item.dataset.name)
                    return

                let id = 'building-' + item.dataset.aid + '-' + item.dataset.gid

                if (addedIds.includes(id))
                    return

                const {getInt} = $th

                let style, image
                let imageElement = item.querySelector('.building')

                if (imageElement) {
                    style = window.getComputedStyle(imageElement)
                    if (style)
                        image = style?.backgroundImage?.slice(4, -1).replace(/"/g, "")
                }

                let link = item.querySelector('a')?.getAttribute('href')

                if (!link)
                    link = '/build.php?id=' + item.dataset.aid + '&gid=' + item.dataset.gid

                result.push({
                    id,
                    gid: item.dataset.gid,
                    title: item.dataset.name,
                    place: item.dataset.aid,
                    level: getInt(item.querySelector('.labelLayer')?.innerText),
                    link,
                    construction: item.querySelector('a')?.classList.contains('underConstruction'),
                    image,
                })

                addedIds.push(id)
            })

            return result
        })

        if (!result || !result.length)
            return

        buildings.value = result

        await initInfo()

        return await storage.local.set({buildings: result})
    }

    const init = async () => {
        let data = await storage.local.get({buildings: []})

        if (data.buildings) {
            buildings.value = data.buildings
            await initInfo()
        } else {
            await fetch()
        }

        return data
    }

    const initInfo = async (force = false) => {
        for (const building of buildings.value) {
            let key = 'buildingsInfo.' + building.gid

            let result = await storage.local.get(key)

            if (result && result[key])
                result = result[key]

            if (!result || force) {
                result = await parseBuildingInfo(building.gid)
                await storage.local.set({
                    [key]: result,
                })
            }

            totalInfo.data[building.gid] = result
        }

        return totalInfo
    }

    return {
        buildings,

        info,
        init,
        initInfo,
        fetch,
    }
})