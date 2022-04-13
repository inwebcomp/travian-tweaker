import Page from "@/elements/Page"
import Browser from "@/tools/Browser"

export const pages = {
    buildings: new Page({
        name: 'buildings',
        reach: async () => {
            console.log('before click')

            const browser = (new Browser())

            console.log('before click')
            await browser.click('.sf-menu .first a')
            console.log('after click')
        },
    }),
}