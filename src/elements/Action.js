import {ActionType, ObjectType} from "@/composables/enums"
import {waitPageLoad} from "@/composables/app"
import {useBuildingsStore} from "@/stores/buildings"
import {useFieldsStore} from "@/stores/fields"
import Field from "@/elements/Field"
import Building from "@/elements/Building"
import {useAppStore} from "@/stores/app"

export default class Action {
    constructor({type, object, level, time}) {
        this.type = type
        this.level = level
        this.time = time

        if (object.objectType == ObjectType.Field && !(object instanceof Field))
            object = new Field(object)
        if (object.objectType == ObjectType.Building && !(object instanceof Building))
            object = new Building(object)

        this.object = object
    }

    async perform() {
        if (this.type == ActionType.Building)
            return await this.performBuilding()
    }

    async performBuilding() {
        return await this.object.goAndBuild(useAppStore().watchAds)
    }

    isBuilding() {
        return this.object.objectType == ObjectType.Building
        // return this.type == ActionType.Building && !this.object.type
    }

    isField() {
        return this.object.objectType == ObjectType.Field
        // return this.type == ActionType.Building && this.object.type
    }

    getInfo() {
        const buildingStore = useBuildingsStore()
        const fieldsStore = useFieldsStore()

        if (this.isBuilding()) {
            return buildingStore.info(this.object, this.level)
        } else if (this.isField()) {
            return fieldsStore.info(this.object, this.level)
        }

        return null
    }
}