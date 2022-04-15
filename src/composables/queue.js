import {useQueueStore} from "@/stores/queue"
import {ActionType, Nation} from "@/composables/enums"
import {useActionsStore} from "@/stores/actions"
import {currentStock} from "@/composables/stock"
import {useAppStore} from "@/stores/app"
import {waitPageLoad} from "@/composables/app"

export const proceed = async () => {
    await proceedBuilding()
}

export const hasResourcesForAction = (action) => {
    const resources = action.getInfo()?.resources

    if (!resources)
        return true

    return currentStock().hasEnough(resources)
}

export const hasBuildSlot = (type) => {
    const actionsStore = useActionsStore()
    const appStore = useAppStore()

    let typeCount = 0
    const totalCount = actionsStore.building.length

    if (appStore.plus) {
        typeCount = actionsStore.building.filter(action => {
            return action.object.type == type
        })?.length || 0
    }

    if (typeCount >= (appStore.plus ? 2 : 1))
        return false

    if (appStore.nation == Nation.Roman) {
        if (totalCount >= (appStore.plus ? 3 : 2)) {
            return false
        }
    } else {
        if (totalCount >= (appStore.plus ? 2 : 1)) {
            return false
        }
    }

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

        if (hasBuildSlot(type) && hasResourcesForAction(action)) {
            await action.perform()
            await queueStore.remove(action)
        }

        return true
    })
}