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

        await alert({title, message})
    }
}

// setTimeout(async () => {
//     if (!(await storage.get('enabled')))
//         return
//
//     let last = await storage.get('lastNotificationSent')
//
//     if (+last + 60 * 1000 < Date.now()) {
//         await checkAttacks()
//         await storage.set('lastNotificationSent', Date.now())
//     }
// }, 500)