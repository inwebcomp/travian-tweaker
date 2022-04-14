/** @property {Document} document */
import {wait} from "@/composables/page"

export const getInt = (str) => {
    return parseFloat(str.replace(/\D/g, ''))
}

export default class Browser {
    constructor(doc = null) {
        this.document = doc || document
    }

    getElement(el) {
        return this.document.querySelector(el)
    }

    async wait(ms = 500) {
        return await wait(ms)
    }

    async click(el, {delay = 500} = {}) {
        const result = await wait(delay)

        const element = this.getElement(el)

        if (!element)
            console.log('Element not found: ' + el)

        element.click()

        return result
    }

    async go(link, {delay = 100} = {}) {
        const result = await wait(delay)

        window.location.href = link

        return result
    }
}