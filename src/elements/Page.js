import Browser from "@/tools/Browser"
import {executeOnActiveTab} from "@/composables/app"

export default class Page {
    constructor({name, reach, link}) {
        this.name = name
        this.reach = reach
        this.link = link
    }

    async go() {
        return await this.reach()
    }
}