// Fast add to Farm List

import storage from "@/composables/storage"
import {wait} from "@/composables/page"
import {random} from "@/composables/helpers"

let interval
document.addEventListener('keydown', (event) => {
    if (!event.altKey)
        return

    if (event.code == 'KeyF') {
        document.querySelector('#crud-raidlist-button')?.click()

        if (interval)
            clearInterval(interval)

        interval = setInterval(() => {
            let button = document.querySelector('#raidListSlot #save')

            if (button) {
                button.focus()
                clearInterval(interval)
            }
        }, 10)

        event.preventDefault()
        event.stopPropagation()
    }
})


const updateTileReports = (container) => {
    let reports = container.querySelectorAll('#troop_info .reportInfo.carry')
    let data = []

    reports?.forEach(el => {
        let parts = el.getAttribute('alt')?.split('/')

        data.push(+parts[0])

        let info = document.createElement('div')
        info.classList.add('travian-tweaker__farm-info')

        let percent = (Math.round(100 / parts[1] * parts[0]))

        info.innerHTML = parts[0] + ' / ' + parts[1] + (percent == 100 ? ' <b>(' + percent + '%)</b>' : ' (' + percent + '%)')

        // el.parentElement.style.display = 'none'

        el.parentElement.parentElement.append(info)
    })


    let total = document.createElement('div')
    total.classList.add('travian-tweaker__farm-info__total')

    let max = Math.max(...data)
    total.innerHTML = 'Max: ' + max

    if (data.length && max !== Infinity)
        container.querySelector('.instantTabs .tabContainer').append(total)
}


const updateFarmReports = (container) => {
    let reports = container.querySelectorAll('.raidList .lastRaid .carry')
    let data = []

    reports?.forEach(el => {
        let alt = el.getAttribute('alt')

        let m = alt.match(/^[\s\S]+?: (\d+) [\s\S]+?: (\d+)/)

        if (!m)
            return

        let parts = [+m[1], +m[2]]

        data.push(+parts[0])

        let info = document.createElement('div')
        info.classList.add('travian-tweaker__farm-info')

        let percent = (Math.round(100 / parts[1] * parts[0]))

        info.innerHTML = parts[0] + ' / ' + parts[1] + (percent == 100 ? ' <b>(' + percent + '%)</b>' : ' (' + percent + '%)')

        // el.parentElement.style.display = 'none'

        el.parentElement.parentElement.append(info)
    })
}


let interval2

if (interval2)
    clearInterval(interval2)

interval2 = setInterval(() => {
    let modal = document.querySelector('#tileDetails')

    if (modal && !modal.dataset.ttLoaded) {
        modal.dataset.ttLoaded = true
        updateTileReports(modal)
    }
}, 50)


let interval3

if (interval3)
    clearInterval(interval3)

interval3 = setInterval(() => {
    let modals = document.querySelectorAll('.raidListContent table')

    modals.forEach(modal => {
        if (modal && !modal.dataset.ttLoaded) {
            modal.dataset.ttLoaded = true
            updateFarmReports(modal)
        }
    })

}, 50)


const time = (timestamp) => {
    const date = new Date(timestamp)
    const values = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ]

    return values.join(':')
}

const getDateTimeSince = (target) => {
    let now = Date.now()
    let minutes = Math.floor((now - target) / 1000 / 60)

    return minutes + " min" + (minutes === 1 ? "" : "s") + ' ago'
}

const setFarmListTime = async (button, listId) => {
    let key = 'farm-list-' + listId + '-sent'
    let lastTime = await storage.getSync(key)
    if (lastTime) {
        let info = button.parentElement.querySelector('.travian-tweaker__farm-time')

        if (!info) {
            info = document.createElement('div')
            info.classList.add('travian-tweaker__farm-time')
            button.parentElement.append(info)
        }

        info.innerHTML = getDateTimeSince(+lastTime)
    }
}

document.querySelectorAll('.textButtonV1.green.startButton').forEach(async (button) => {
    let listId = +button.parentElement.parentElement.parentElement.dataset.listid
    let key = 'farm-list-' + listId + '-sent'

    await setFarmListTime(button, listId)

    button.addEventListener('click', async (event) => {
        await storage.setSync(key, Date.now())
        await setFarmListTime(button, listId)
    })
})


document.querySelectorAll('.villageHeadline').forEach(farmListsContainer => {
    let farmAllButton = document.createElement('button')
    farmAllButton.type = 'button'
    farmAllButton.classList.add('textButtonV1', 'green', 'startButton')
    farmAllButton.innerText = "Start all"

    farmListsContainer.append(farmAllButton)

    farmAllButton.addEventListener('click', async (event) => {
        for (const button of farmAllButton.parentElement.parentElement.querySelectorAll("form .startButton")) {
            button.click()
            await wait(random(800, 1200))
        }
    })
})
