// Fast add to Farm List

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


const updateTileReports = () => {
    let reports = document.querySelectorAll('#troop_info .reportInfo.carry')
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
        document.querySelector('.instantTabs .tabContainer').append(total)
}


const updateFarmReports = () => {
    let reports = document.querySelectorAll('.raidList .lastRaid .carry')
    let data = []

    reports?.forEach(el => {
        let alt = el.getAttribute('alt')

        let m = alt.match(/^[\s\S]+?: (\d+) [\s\S]+?: (\d+)/)

        if (! m)
            return

        let parts = [+m[1], +m[2]]
        console.log(parts)

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
        updateTileReports()
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
            updateFarmReports()
        }
    })

}, 50)