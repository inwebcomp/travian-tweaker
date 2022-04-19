import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"
import {ActionType} from "@/composables/enums"
import {useFieldsStore} from "@/stores/fields"
import {useBuildingsStore} from "@/stores/buildings"
import {groupBy} from "@/composables/helpers"
import Building from "@/elements/Building"
import Field from "@/elements/Field"

export const useActionsStore = defineStore('actions', () => {
    const building = ref([])
    const training = ref([])
    const learning = ref([])

    const fetch = async () => {
        let result = await executeOnActiveTab(async () => {
            const {enums: {ActionType}, getInt} = $th

            if (window.location.href.indexOf('dorf1.php') == -1 && window.location.href.indexOf('dorf2.php') == -1)
                return {building: null}

            let building = []

            document.querySelectorAll('.buildingList li').forEach((el, index) => {
                building.push({
                    type: ActionType.Building,
                    object: {
                        index,
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
            let grouped = groupBy(result.building, (item) => item.object.title + '-' + item.level)

            result.building = result.building.map(item => {
                let key = item.object.title

                if (grouped[item.object.title + '-' + item.level].length > 1)
                    key += '-' + item.object.index

                let addLevel = used[key] ? used[key] + 1 : 1
                let usedAnyField = false

                let underConstructionField = fieldsStore.fields.value?.find(field => field.construction && (+field.level + addLevel == +item.level) && item.object.title == field.title)
                if (underConstructionField) {
                    item.object = new Field(underConstructionField)
                    usedAnyField = true
                }

                let underConstructionBuilding = buildingsStore.buildings.find(building => building.construction && (+building.level + addLevel == +item.level) && item.object.title == building.title)
                if (underConstructionBuilding) {
                    item.object = new Building(underConstructionBuilding)
                    usedAnyField = true
                }

                if (usedAnyField) {
                    if (!used[key])
                        used[key] = 1
                    else
                        used[key]++
                }

                return item
            })

            if (!result.building)
                return

            building.value = result.building

            await storage.local.set({'actions.building': result.building})
        }

        return result
    }

    const init = async () => {
        let data = await storage.local.get('actions.building')

        if (data['actions.building']) {
            building.value = data['actions.building']
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