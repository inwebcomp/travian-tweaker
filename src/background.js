import {activeTab, executeOnTab} from "@/composables/app"

chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {

    }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message === 'document-loaded') {
        // await executeOnTab(await activeTab(), () => {
        //     alert('load');
        // })

        sendResponse({status: 'ok'});
    }
});