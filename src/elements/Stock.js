export default class Stock {
    /** @property {Object} resources */
    constructor(resources = {}) {
        this.resources = resources
    }

    /** @param {Stock|Object} resources */
    hasEnough(resources) {
        if (resources instanceof Stock) {
            resources = resources.resources
        }

        return Object.entries(resources).every(([type, amount]) => amount <= this.resources[type])
    }

    /** @param {Stock|Object} resources */
    add(resources) {
        if (resources instanceof Stock) {
            resources = resources.resources
        }

        Object.entries(resources).every(([type, amount]) => this.resources[type] = (this.resources[type] || 0) + amount)

        return this
    }
}