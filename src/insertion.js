import Browser, {getInt} from "@/tools/Browser"

console.log('Travian Tweaker: Inserted')

window.$tt = {}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded')
    await chrome.runtime.sendMessage(chrome.runtime.id, {type: 'document-loaded'})

    require('@/insertions/map')
    require('@/insertions/production')
    require('@/insertions/hotkeys')
    require('@/insertions/movements')
    require('@/insertions/urlify')
    require('@/insertions/farm')
    require('@/insertions/autosender')
    require('@/insertions/notifications')
})