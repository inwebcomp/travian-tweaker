// import {executeOnTab} from "@/composables/app"
// import { storage } from '@extend-chrome/storage'

chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {

        // await executeOnTab(tab, () => {
        //     alert('load');
        // })

    }
})
