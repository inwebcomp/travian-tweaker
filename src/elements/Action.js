import Field from "@/elements/Field"
import {ActionType} from "@/composables/enums"
import Building from "@/elements/Building"
import {waitPageLoad} from "@/composables/app"

export default class Action {
    constructor({type, object, level, time}) {
        this.type = type
        this.object = object
        this.level = level
        this.time = time
    }

    async perform() {
        if (this.type == ActionType.Building)
            return await this.performBuilding()
    }

    async performBuilding() {
        if (this.object instanceof Field) {
            await this.object.goAndBuild()
        } else if (this.object instanceof Building) {
            await this.object.goAndBuild()
        }

        return await waitPageLoad()
    }
}