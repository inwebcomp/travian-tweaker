import {defineStore} from "pinia"
import {ref} from "vue"
import {ActionType} from "@/composables/enums"

export const useQueueStore = defineStore('queue', () => {
    /** @type {{value: Array.<Action>}} */
    const all = ref([])

    const building = () => {
        return all.value
            .filter(action => action.type == ActionType.Building)
    }

    const add = (action) => {
        all.value.push(action)
    }

    const remove = (action) => {
        all.value = all.value.filter(item => !(item.object.id == action.object.id && item.level == action.level))
    }

    return {
        building,

        all,

        add,
        remove,
    }
})