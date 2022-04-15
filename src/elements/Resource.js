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

    static get all() {
        return [
            Resource.Wood,
            Resource.Clay,
            Resource.Iron,
            Resource.Crop,
        ]
    }

    static get gids() {
        return [1, 2, 3, 4]
    }

    get order() {
        return Resource.all.indexOf(this.type)
    }
}