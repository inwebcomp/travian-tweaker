import Browser from "@/tools/Browser"
import {pages} from "@/composables/page"
import Resource from "@/elements/Resource"
import Field from "@/elements/Field"

console.log('Travian Helper: Inserted')

window.$th = {
    browser: Browser,
    resource: Resource,
    Field,
    pages,
}

//
setTimeout(() => {
    window.postMessage('document-loaded', "*")

    chrome.runtime.sendMessage(chrome.runtime.id, 'document-loaded', function(res) {
        console.log('document-loaded');
    });
}, 500)



