const initAutosender = () => {
    let form = document.querySelector('#troopSendForm')

    if (! form)
        return

    form.classList.add('travian-tweaker__autosender')

    let arrivalTimeEl = form.querySelector('.at')
    let arrivalTime = arrivalTimeEl.innerText.trim()
    arrivalTime = arrivalTime.substring(arrivalTime.length - 8)


    let input = document.createElement('input')
    input.type = 'time'
    input.step = '1'
    input.value = arrivalTime
    input.classList.add('travian-tweaker__time')

    let ttfb = document.createElement('input')
    ttfb.type = 'number'
    ttfb.step = '1'
    ttfb.value = "300"
    ttfb.classList.add('travian-tweaker__time')
    ttfb.style.width = '60px'
    ttfb.style.marginRight = '4px'

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('travian-tweaker__checkbox')

    let ms = document.createElement('span')
    ms.innerText = 'ms'
    ms.style.marginRight = '8px'
    ms.style.verticalAlign = 'top'

    arrivalTimeEl?.parentElement.insertBefore(ttfb, arrivalTimeEl)
    arrivalTimeEl?.parentElement.insertBefore(ms, arrivalTimeEl)
    arrivalTimeEl?.parentElement.insertBefore(input, arrivalTimeEl)
    arrivalTimeEl?.parentElement.insertBefore(checkbox, arrivalTimeEl)


    const timeToSec = (time) => {
        let part = time.split(':')
        return +part[0] * 60 * 60 + +part[1] * 60 + +part[2]
    }


    let interval

    if (interval)
        clearInterval(interval)

    let secStarted
    let elapsedFromSec
    let lastTime

    interval = setInterval(() => {
        if (!checkbox.checked)
            return

        let arrivalTimeEl = form.querySelector('.at')
        let arrivalTime = arrivalTimeEl.innerText.trim()
        arrivalTime = arrivalTime.substring(arrivalTime.length - 8)

        let arrival = timeToSec(input.value)
        let current = timeToSec(arrivalTime)

        if (arrival + 60 < current)
            arrival += 60 * 60 * 24

        if (lastTime != current) {
            elapsedFromSec = 0
        }

        lastTime = current

        elapsedFromSec += 10

        arrival *= 1000
        current *= 1000

        current += elapsedFromSec
        current += +ttfb.value

        console.log(arrival, current)

        if (Math.round(arrival / 10) == Math.round(current / 10)) {
            form.querySelector('.rallyPointConfirm').click()

            clearInterval(interval)
        }
    }, 10)
}

initAutosender()
