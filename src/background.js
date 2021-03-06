import {registerPageLoadWatcher} from "@/composables/app"

const onToggleAppState = (state) => {
    chrome.action.setIcon({path: {"19": "/favicon" + (state ? '-active' : '') + ".png"}})
}

chrome.runtime.onStartup.addListener(async (message, sender, sendResponse) => {
    const data = await chrome.storage.local.get('enabled', false)
    onToggleAppState(data.enabled)
})

chrome.runtime.onInstalled.addListener(async (message, sender, sendResponse) => {
    const data = await chrome.storage.local.get('enabled', false)
    onToggleAppState(data.enabled)
})

// Listeners
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    // sendResponse({status: 'ok'})
    if (message.type === 'toggle-app-state') {
        onToggleAppState(message.data)
    } else if (message.type === 'document-loaded') {
        console.warn('dom loaded')
    }
})

registerPageLoadWatcher()
