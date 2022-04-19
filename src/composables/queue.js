import {useQueueStore} from "@/stores/queue"
import {ActionType, Nation} from "@/composables/enums"
import {useActionsStore} from "@/stores/actions"
import {currentStock} from "@/composables/stock"
import {useAppStore} from "@/stores/app"
import {waitPageLoad} from "@/composables/app"
import {wait} from "@/composables/page"

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
    return await proceedOfType(ActionType.Building)
}

export const proceedOfType = async (type) => {
    const queueStore = useQueueStore()
    const appStore = useAppStore()

    /** @type Array.<Action> */
    let queued = queueStore.building()

    for (let action of queued) {
        if (action.type != type)
            continue

        // if (type == ActionType.Building && appStore.nation == Nation.Roman) {
        //     if (action.isBuilding())
        //         continue
        // }

        if (hasBuildSlot(type) && hasResourcesForAction(action)) {
            await action.perform()
            await queueStore.remove(action)
        }

        break
    }

    // if (type == ActionType.Building && appStore.nation == Nation.Roman) {
    //     for (let action of queued) {
    //         if (action.type != type)
    //             continue
    //
    //         if (action.isField())
    //             continue
    //
    //         if (hasBuildSlot(type) && hasResourcesForAction(action)) {
    //             await action.perform()
    //             await queueStore.remove(action)
    //         }
    //
    //         break
    //     }
    // }

    return await wait(100)
}