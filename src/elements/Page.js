export default class Page {
    constructor({name, reach}) {
        this.name = name
        this.reach = reach
    }

    async go() {
        await this.reach()
    }
}