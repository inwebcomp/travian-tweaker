// let tabId = await activeTab().id

import {onLifecycle} from "@/background/lifecycle"
import {registerPageLoadWatcher} from "@/composables/app"

const log = async (data) => console.log(data)

let interval

const startLifecycle = () => {
    if (interval)
        clearInterval(interval)

    // interval = setInterval(async () => {
    //     onLifecycle()
    // }, 1000)
}

const onToggleAppState = (state) => {
    chrome.action.setIcon({path: {"19": "/favicon" + (state ? '-active' : '') + ".png"}})
}

// Listeners
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'toggle-app-state') {
        onToggleAppState(message.data)
    } else if (message.type === 'document-loaded') {
        console.warn('dom loaded')

        sendResponse({status: 'ok'})
    }
})

registerPageLoadWatcher()
startLifecycle()