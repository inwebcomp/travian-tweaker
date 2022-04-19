import Browser from "@/tools/Browser"
import {pages} from "@/composables/page"
import Resource from "@/elements/Resource"
import Field from "@/elements/Field"
// import Action from "@/elements/Action"
import {getInt} from "@/tools/Browser"
import {ActionType} from "@/composables/enums"

console.log('Travian Helper: Inserted')

window.$th = {
    browser: Browser,
    getInt,
    Resource,
    Field,
    // Action,
    pages,
    enums: {
        ActionType,
    },
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded')
    await chrome.runtime.sendMessage(chrome.runtime.id, {type: 'document-loaded'})
})

// setTimeout(() => {
// }, 500)



