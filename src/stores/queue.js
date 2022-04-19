import {defineStore} from "pinia"
import {ref} from "vue"
import {ActionType} from "@/composables/enums"
import {storage} from "@extend-chrome/storage"
import Action from "@/elements/Action"

export const useQueueStore = defineStore('queue', () => {
    /** @type {{value: Array.<Action>}} */
    const all = ref([])

    const save = async () => {
        return await storage.local.set({'queue': Array.from(all.value)})
    }

    const building = () => {
        return all.value.filter(action => action.type == ActionType.Building)
    }

    const add = async (action) => {
        all.value.push(action)
        await save()
    }

    const remove = async (action) => {
        all.value = all.value.filter(item => !(item.object.id == action.object.id && item.level == action.level))
        return await save()
    }

    const init = async () => {
        let data = await storage.local.get('queue')

        if (data['queue']) {
            all.value = data['queue'].map(item => new Action(item))
        }

        return data
    }

    return {
        building,

        all,

        init,
        add,
        remove,
    }
})