import Resource from "@/elements/Resource"
import {executeOnActiveTab, waitPageLoad} from "@/composables/app"

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

    async goAndBuild() {
        await this.go()
        await waitPageLoad()
        return await this.build()
    }

    async build() {
        return await executeOnActiveTab(async () => {
            const browser = (new $th.browser())
            return await browser.click('.upgradeButtonsContainer .section1 button.green.build')
        })
    }
}