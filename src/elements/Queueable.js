import Action from "@/elements/Action"
import {useQueueStore} from "@/stores/queue"
import {ActionType} from "@/composables/enums"
import Field from "@/elements/Field"
import {useActionsStore} from "@/stores/actions"

export default class Queueable {
    static field(field) {
        const queueStore = useQueueStore()
        const actionsStore = useActionsStore()

        let actions = actionsStore.building
        let queued = queueStore.building()

        const actionType = ActionType.Building

        let found
        actions.forEach(action => {
            if (action.type == actionType && action.object.id == field.id && (!found || found.level < action.level))
                found = action
        })

        queued.forEach(action => {
            if (action.type == actionType && action.object.id == field.id && (!found || found.level < action.level))
                found = action
        })

        let level = (found) ? found.level + 1 : +field.level + 1

        return new Action({
            type: actionType,
            object: field,
            level,
        })
    }

    static building(building) {
        const queueStore = useQueueStore()
        const actionsStore = useActionsStore()

        let actions = actionsStore.building
        let queued = queueStore.building()

        const actionType = ActionType.Building

        let found
        actions.forEach(action => {
            if (action.type == actionType && action.object.id == building.id && (!found || found.level < action.level))
                found = action
        })

        queued.forEach(action => {
            if (action.type == actionType && action.object.id == building.id && (!found || found.level < action.level))
                found = action
        })

        let level = (found) ? found.level + 1 : +building.level + 1

        return new Action({
            type: actionType,
            object: building,
            level,
        })
    }
}