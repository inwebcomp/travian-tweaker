import Resource from "@/elements/Resource"
import Browser from "@/tools/Browser"
import {wait} from "@/composables/page"
import {executeOnActiveTab} from "@/composables/app"

export default class Field {
    constructor({type, level, link}) {
        this.type = type
        this.level = level
        this.link = link
    }

    get order() {
        return (new Resource({type: this.type})).order
    }

    async go(props) {
        return await executeOnActiveTab(async (link, props) => {
            const browser = (new $th.browser())
            return await browser.go(link, props)
        }, [this.link, props])
    }

    async goAndBuild() {
        await this.go()
        await wait(1000)
        return await this.build()
    }

    async build() {
        return await executeOnActiveTab(async () => {
            const browser = (new $th.browser())
            return await browser.click('.upgradeButtonsContainer .section1 button.green.build')
        })
    }
}