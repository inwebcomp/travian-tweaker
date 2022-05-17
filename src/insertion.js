import Browser, {getInt} from "@/tools/Browser"

console.log('Travian Tweaker: Inserted')

window.$th = {
    browser: Browser,
    getInt,
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded')
    await chrome.runtime.sendMessage(chrome.runtime.id, {type: 'document-loaded'})

    require('@/insertions/production')
    require('@/insertions/hotkeys')
    require('@/insertions/movements')
})