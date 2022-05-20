const movementsEls = document.querySelectorAll('.troop_details')

movementsEls.forEach(el => {
    let button = document.createElement('div')
    button.classList.add('travian-tweaker__copy')
    button.setAttribute('title', 'Copy')

    const img = document.createElement('img')
    img.src = chrome.runtime.getURL('img/icons/copy2.svg')

    button.append(img)

    button.addEventListener('click', (event) => {
        const table = event.target.parentElement.parentElement.parentElement.parentElement.parentElement

        let type = 'Attack'
        let direction = 'in'

        if (table.classList.contains('inReturn')) {
            type = 'Return'
        } else if (table.classList.contains('outRaid')) {
            type = 'Raid'
            direction = 'out'
        } else if (table.classList.contains('inRaid')) {
            type = 'Raid'
            direction = 'in'
        } else if (table.classList.contains('outAttack')) {
            type = 'Attack'
            direction = 'out'
        } else if (table.classList.contains('inAttack')) {
            type = 'Attack'
            direction = 'in'
        } else if (table.classList.contains('outSpy')) {
            type = 'Spy'
            direction = 'out'
        } else if (table.classList.contains('inSpy')) {
            type = 'Spy'
            direction = 'in'
        } else if (table.classList.contains('outSupply')) {
            type = 'Support'
            direction = 'out'
        } else if (table.classList.contains('inSupply')) {
            type = 'Support'
            direction = 'in'
        }

        let arrival = table.querySelector('.at').innerText.trim()

        let from = table.querySelector('.troopHeadline a').getAttribute('href').match(/\d+$/)

        if (from)
            from = +from[0]

        from = window.$tt.map.find(v => +v.villageId === from)

        let data = {
            arrival: arrival.substring(arrival.length - 8),
            coords: table.querySelector('.coords').innerText.trim(),
            from,
            type,
            direction,
        }

        let result

        if (event.ctrlKey)
            result = data.type + (data.from ? ' from [x|y](' + (data.from.x + '|' + data.from.y) + ')[/x|y]' : '') + ' to [x|y]' + (data.coords) + '[/x|y] arrives at [b]' + data.arrival + '[/b]'
        else
            result = data.type + (data.from ? ' from (' + (data.from.x + '|' + data.from.y) + ')' : '') + ' to ' + (data.coords) + ' arrives at ' + data.arrival

        navigator.clipboard?.writeText(result)
    })


    el.classList.add('travian-tweaker__relative')

    el.querySelector('.troopHeadline').append(button)
})