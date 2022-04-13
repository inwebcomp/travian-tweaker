export default class Resource {
    static get Wood() { return 'wood' }
    static get Clay() { return 'clay' }
    static get Iron() { return 'iron' }
    static get Crop() { return 'crop' }

    constructor({type, amount, produce, limit}) {
        this.type = type
        this.amount = amount
        this.produce = produce
        this.limit = limit
    }

    get order() {
        return [
            Resource.Wood,
            Resource.Clay,
            Resource.Iron,
            Resource.Crop,
        ].indexOf(this.type)
    }
}