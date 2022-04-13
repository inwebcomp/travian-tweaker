import Browser from "@/tools/Browser"
import {pages} from "@/composables/page"
import Resource from "@/elements/Resource"

console.log('Travian Helper: Inserted')

window.$th = {
    browser: Browser,
    resource: Resource,
    pages,
}
