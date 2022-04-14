import Page from "@/elements/Page"
import Browser from "@/tools/Browser"

export const pages = {
    buildings: new Page({
        name: 'buildings',
        reach: async (browser) => {
            return await browser.click('.menu__item')
        },
    }),
}

export const wait = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}