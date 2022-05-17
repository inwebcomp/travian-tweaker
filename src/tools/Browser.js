import {wait} from "@/composables/page"
import {activeTab, executeOnActiveTab, setMuteState, waitPageLoad} from "@/composables/app"

export const getInt = (str) => {
    return parseFloat(str.replace(/[^\d\-]/g, ''))
}

/** @property {Document} document */
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

    async click(el, {delay = 300} = {}) {
        const result = await wait(delay)

        const element = this.getElement(el)

        if (!element)
            console.log('Element not found: ' + el)

        element.click()

        return result
    }

    async go(link, {delay = 100} = {}) {
        if (window.location.pathname.indexOf(link) === 0)
            return

        const result = await wait(delay)

        window.location.href = link

        return result
    }
}

export const performBuildAction = async (withAds) => {
    const wasAd = await executeOnActiveTab(async (withAds) => {
        const browser = (new $th.browser())

        if (!withAds || !document.querySelector('.upgradeButtonsContainer .section2 button.green.build')) {
            await browser.click('.upgradeButtonsContainer .section1 button.green.build')
            return false
        }

        await browser.click('.upgradeButtonsContainer .section2 button.green.build')
        return true
    }, [withAds])

    if (!wasAd && withAds)
        withAds = false

    if (!withAds)
        return await wait(100)

    await wait(3000)
    let tabId = (await activeTab()).id

    const frames = await chrome.webNavigation.getAllFrames({tabId})
    const frameId = frames.find(r => r.url.match('media.oadts.com'))?.frameId

    if (!frameId)
        return await wait(100)

    await setMuteState(tabId, true)

    await chrome.scripting.executeScript({
        target: {tabId, frameIds: [frameId]},
        func: async () => {
            console.log('clicking play')
            await document.querySelector('.vjs-big-play-button')?.click()
        },
    })

    // @todo Should lock from redirect
    await waitPageLoad()
    return await setMuteState(tabId, false)
}