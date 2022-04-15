import Resource from "@/elements/Resource"
import {executeOnActiveTab, waitPageLoad} from "@/composables/app"
import {ObjectType} from "@/composables/enums"
import {wait} from "@/composables/page"
import {performBuildAction} from "@/tools/Browser"

export default class Building {
    constructor({id, gid, title, place, level, link, construction, image}) {
        this.id = id
        this.gid = gid
        this.title = title
        this.place = place
        this.level = level
        this.link = link
        this.construction = construction
        this.image = image
        this.objectType = ObjectType.Building
    }

    get order() {
        return this.place
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