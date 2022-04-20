// let tabId = await activeTab().id

import {registerPageLoadWatcher} from "@/composables/app"
import {onLifecycle} from "@/background/lifecycle"
// import {useMovementsStore} from "@/stores/movements"

const log = async (data) => console.log(data)

let interval

const startLifecycle = () => {
    if (interval)
        clearInterval(interval)

    interval = setInterval(async () => {
        onLifecycle()
    }, 1000)

}

const onToggleAppState = (state) => {
    chrome.action.setIcon({path: {"19": "/favicon" + (state ? '-active' : '') + ".png"}})
}

// Listeners
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     // sendResponse({status: 'ok'})
//     if (message.type === 'toggle-app-state') {
//         onToggleAppState(message.data)
//     } else if (message.type === 'document-loaded') {
//         console.warn('dom loaded')
//     }
// })

chrome.notifications.onClicked.addListener(() => {
    // const movementsStore = useMovementsStore()
    // movementsStore.init()

    // console.log(movementsStore.movements)
})


registerPageLoadWatcher()
startLifecycle()