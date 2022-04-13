import Browser from "@/tools/Browser"

export default class Page {
    constructor({name, reach}) {
        this.name = name
        this.reach = reach
    }

    async go() {
        const browser = (new Browser())

        return await this.reach(browser)
    }
}