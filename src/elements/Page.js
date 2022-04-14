import Browser from "@/tools/Browser"
import {executeOnActiveTab} from "@/composables/app"

export default class Page {
    constructor({name, reach}) {
        this.name = name
        this.reach = reach
    }

    async go() {
        return await this.reach()
    }
}