import Page from "@/elements/Page"
import {executeOnActiveTab} from "@/composables/app"

export const pages = {
    fields: new Page({
        name: 'fields',
        reach: async () => {
            return await executeOnActiveTab(async () => {
                let link = '/dorf1.php'
                const browser = (new $th.browser())
                return await browser.go(link, {delay: 100})
            })
        },
    }),

    buildings: new Page({
        name: 'buildings',
        reach: async () => {
            return await executeOnActiveTab(async () => {
                let link = '/dorf2.php'
                const browser = (new $th.browser())
                return await browser.go(link, {delay: 100})
            })
        },
    }),

    movements: new Page({
        name: 'buildings',
        reach: async () => {
            return await executeOnActiveTab(async () => {
                let link = '/build.php?gid=16&tt=1&filter=0'
                const browser = (new $th.browser())
                return await browser.go(link, {delay: 100})
            })
        },
    }),
}

export const wait = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}