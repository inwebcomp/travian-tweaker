import {alert} from "@/composables/notifications"
import storage from "@/composables/storage"

let checkAttacks = async () => {
    let attacks = document.querySelectorAll('.villageList .listEntry.attack .attack')

    for (const attack of attacks) {
        let villageId = +attack.parentElement.dataset.id

        let to = window.$tt.map.find(v => +v.villageId === villageId)

        let playerName = document.querySelector('.playerName').innerText.trim()

        let title = 'Attack'
        let message = ''

        if (to) {
            message = 'To ' + to.villageTitle
        }

        let last = await storage.get('lastNotificationSent')

        if (+last + 60 * 1000 < Date.now()) {
            await alert({title, message})
            await storage.set('lastNotificationSent', Date.now())
        }
    }
}

setTimeout(async () => {
    if (!(await storage.get('watchAttacks')))
        return

    let container = document.querySelector('#sidebarBoxVillagelist .content')

    if (container && !container.dataset.ttLoaded) {
        container.dataset.ttLoaded = true

        const icon = document.createElement('span')
        const img = document.createElement('img')
        img.src = chrome.runtime.getURL('img/icons/watch.svg')
        icon.append(img)

        icon.classList.add('travian-tweaker__watch-attacks', 'travian-tweaker__tooltip')
        icon.dataset.text = 'Watching for attacks'
        container.append(icon)
    }

    await checkAttacks()
}, 50)