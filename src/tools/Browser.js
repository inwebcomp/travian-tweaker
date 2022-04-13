const wait = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

/** @property {Document} document */
export default class Browser {
    constructor(doc = null) {
        this.document = doc || document
    }

    getElement(el) {
        return this.document.querySelector('.sf-menu .first a')
    }

    async click(el, {delay = 500} = {}) {
        const result = await wait(delay)

        const element = this.getElement(el)

        if (! element)
            console.log('Element not found: ' + el)

        element.click()

        return result
    }
}