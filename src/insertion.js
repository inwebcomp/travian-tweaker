import storage from "@/composables/storage"

console.log('Travian Tweaker: Inserted')

window.$tt = {}

storage.get('enabled').then(value => {
    if (value) {
        document.body.classList.add('travian-tweaker')
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded')
    await chrome.runtime.sendMessage(chrome.runtime.id, {type: 'document-loaded'})

    if (!(await storage.get('enabled'))) {
        console.log('Travian Tweaker: Disabled')
        return
    }

    require('@/insertions/map')
    require('@/insertions/production')
    require('@/insertions/hotkeys')
    require('@/insertions/movements')
    require('@/insertions/urlify')
    require('@/insertions/farm')
    require('@/insertions/autosender')
    require('@/insertions/notifications')
})