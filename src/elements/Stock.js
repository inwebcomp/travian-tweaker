export default class Stock {
    /** @property {Object} resources */
    constructor(resources) {
        this.resources = resources
    }

    /** @param {Stock|Object} resources */
    hasEnough(resources) {
        if (resources instanceof Stock) {
            resources = resources.resources
        }

        return Object.entries(resources).every(([type, amount]) => amount <= this.resources[type])
    }
}