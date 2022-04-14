import Action from "@/elements/Action"
import {useQueueStore} from "@/stores/queue"
import {ActionType} from "@/composables/enums"

export const proceed = async () => {
    await proceedBuilding()
}

export const hasBuildSlot = (type) => {
    return true
}

export const proceedBuilding = async () => {
    await proceedOfType(ActionType.Building)
}

export const proceedOfType = async (type) => {
    const queueStore = useQueueStore()

    /** @type Array.<Action> */
    let queued = queueStore.building()

    await queued.find(async action => {
        if (action.type != type)
            return false

        if (hasBuildSlot(type)) {
            await action.perform()
            await queueStore.remove(action)
        }

        return true
    })
}