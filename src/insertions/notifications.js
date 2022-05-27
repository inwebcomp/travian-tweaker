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
    if (!(await storage.get('enabled')))
        return

    await checkAttacks()
}, 1000)