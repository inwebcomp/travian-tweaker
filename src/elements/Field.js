import Resource from "@/elements/Resource"

export default class Field {
    constructor({type, level, link}) {
        this.type = type
        this.level = level
        this.link = link
    }

    get order() {
        return (new Resource({type: this.type})).order
    }
}