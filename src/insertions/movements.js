const movementsEls = document.querySelectorAll('.troop_details')

movementsEls.forEach(el => {
    let button = document.createElement('div')
    button.classList.add('travian-tweaker__copy')
    button.setAttribute('title', 'Copy')

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('img/icons/copy2.svg');

    button.append(img)


    button.addEventListener('click', (event) => {
        const table = event.target.parentElement.parentElement.parentElement.parentElement.parentElement
        console.log(table)

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
        }

        let arrival = table.querySelector('.at').innerText.trim()

        let data = {
            arrival: arrival.substring(arrival.length - 8),
            coords: table.querySelector('.coords').innerText.trim(),
            type,
            direction,
        }

        let result = data.type + ' to [x|y]' + (data.coords) + '[/x|y] arrives at [b]' + data.arrival + '[/b]'

        navigator.clipboard?.writeText(result)

        console.log(result)
    })


    el.classList.add('travian-tweaker__relative')

    el.querySelector('.troopHeadline').append(button)
})