import Resource from "@/elements/Resource"
import {activeTab, executeOnActiveTab, waitPageLoad} from "@/composables/app"
import {ObjectType} from "@/composables/enums"
import {wait} from "@/composables/page"
import {performBuildAction} from "@/tools/Browser"

export default class Field {
    constructor({type, level, link, place, construction}) {
        this.type = type
        this.level = level
        this.link = link
        this.place = place
        this.construction = construction

        this.objectType = ObjectType.Field
        this.gid = this.order + 1
    }

    get id() {
        return this.type + '-' + this.place
    }

    get title() {
        return this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }

    get order() {
        return (new Resource({type: this.type})).order
    }

    async go() {
        return await executeOnActiveTab(async (link) => {
            const browser = (new $th.browser())
            return await browser.go(link)
        }, [this.link])
    }

    async goAndBuild(withAds = false) {
        await this.go()
        await waitPageLoad()
        return await this.build(withAds)
    }

    async build(withAds = false) {
        return await performBuildAction(withAds)
    }
}