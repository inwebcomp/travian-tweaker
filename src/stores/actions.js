import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"
import {ActionType} from "@/composables/enums"
import {useFieldsStore} from "@/stores/fields"
import {useBuildingsStore} from "@/stores/buildings"

export const useActionsStore = defineStore('actions', () => {
    const building = ref([])
    const training = ref([])
    const learning = ref([])

    const fetch = async () => {
        let result = await executeOnActiveTab(async () => {
            const {enums: {ActionType}, getInt} = $th

            let building = []

            document.querySelectorAll('.buildingList li').forEach(el => {
                building.push({
                    type: ActionType.Building,
                    object: {
                        title: el.querySelector('.name').firstChild.textContent.trim(),
                    },
                    level: getInt(el.querySelector('.lvl').innerText),
                    time: getInt(el.querySelector('.timer').getAttribute('value')),
                })
            })

            return {
                building,
            }
        })

        if (result.building) {
            const fieldsStore = useFieldsStore()
            const buildingsStore = useBuildingsStore()

            let used = {}
            result.building = result.building.map(item => {
                let addLevel = used[item.title] ? used[item.title] + 1 : 1

                let underConstructionField = fieldsStore.fields.value?.find(field => field.construction && (+field.level + addLevel == +item.level))
                if (underConstructionField) {
                    item.object = underConstructionField
                }

                underConstructionField = buildingsStore.buildings.find(field => field.construction && (+field.level + addLevel == +item.level))

                if (underConstructionField) {
                    item.object = underConstructionField
                }

                if (! used[item.title])
                    used[item.title] = 1
                else
                    used[item.title]++

                return item
            })

            building.value = result.building
            await storage.local.set({actions: {building: result.building}})
        }

        return result
    }

    const init = async () => {
        let data = await storage.local.get({actions: {building: []}})

        if (data.resources) {
            building.value = data.building
        } else {
            return await fetch()
        }

        return data
    }

    return {
        building,

        init,
        fetch,
    }
})