// Messages
const messageContainer = document.querySelector('#message')

messageContainer?.addEventListener('keydown', (event) => {
    if (!event.ctrlKey)
        return

    if (event.code == 'KeyB') {
        document.querySelector(".bbBold").click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyI') {
        document.querySelector(".bbItalic").click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyU') {
        document.querySelector(".bbUnderscore").click()
        event.preventDefault()
        event.stopPropagation()
    }
})

messageContainer?.addEventListener('keydown', (event) => {
    if (!event.altKey)
        return

    if (event.code == 'KeyA') {
        document.querySelector(".bbAlliance").click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyP') {
        document.querySelector(".bbPlayer").click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyC') {
        document.querySelector(".bbCoordinate").click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyR') {
        document.querySelector(".bbReport").click()
        event.preventDefault()
        event.stopPropagation()
    }
})