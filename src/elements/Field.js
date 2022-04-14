import Resource from "@/elements/Resource"
import {executeOnActiveTab, waitPageLoad} from "@/composables/app"

export default class Field {
    constructor({type, level, link, place, construction}) {
        this.type = type
        this.level = level
        this.link = link
        this.place = place
        this.construction = construction
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