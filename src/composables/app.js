export const activeTab = async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    return tab
}

const bundleMap = () => fetch('../manifest.bundle.json')

const asset = async (file) => {
    let data = await bundleMap()
    data = await data.json()

    if (data && data[file])
        return data[file]

    return file
}

export const insertScript = async (tab) => {
    return chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: [await asset('insertion.js')],
    })
}

export const executeOnTab = async (tab, fn, args) => {
    return await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: fn,
        args,
    })
}

export const executeOnActiveTab = async (fn, args) => {
    return await executeOnTab(await activeTab(), fn, args).then(result => result[0].result)
}

export const waitPageLoad = () => {
    return (new Promise((resolve) => {
        let handle = (message, sender, sendResponse) => {
            if (message === 'document-loaded') {
                sendResponse({status: 'ok'})
                chrome.runtime.onMessage.removeListener(handle)
                resolve()
            }
        }

        chrome.runtime.onMessage.addListener(handle)
    }))
}

let onPageLoadListeners = []

export const onPageLoad = (fn) => {
    onPageLoadListeners.push(fn)
}

export const removeOnPageLoadListener = (fn) => {
    onPageLoadListeners = onPageLoadListeners.filter(item => item !== fn)
}

export const registerPageLoadWatcher = () => {
    let handle = (message, sender, sendResponse) => {
        if (message === 'document-loaded') {
            sendResponse({status: 'ok'})
            onPageLoadListeners.forEach(fn => fn())
        }
    }

    chrome.runtime.onMessage.removeListener(handle)
    chrome.runtime.onMessage.addListener(handle)
}

