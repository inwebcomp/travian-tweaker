import Browser from "@/tools/Browser"

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

export const executeOnTab = async (tab, fn, args) => {
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: [await asset('insertion.js')],
    })

    return chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: fn,
        args,
    })
}

export const executeOnActiveTab = async (fn, args) => {
    return await executeOnTab(await activeTab(), fn, args).then(result => result[0].result)
}