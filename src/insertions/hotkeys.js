// Messages
const messageContainer = document.querySelector('#message')

const bbBold = document.querySelector(".bbBold")
const bbItalic = document.querySelector(".bbItalic")
const bbUnderscore = document.querySelector(".bbUnderscore")
const bbAlliance = document.querySelector(".bbAlliance")
const bbPlayer = document.querySelector(".bbPlayer")
const bbCoordinate = document.querySelector(".bbCoordinate")
const bbReport = document.querySelector(".bbReport")
const bbPreview = document.querySelector(".bbPreview")

bbBold?.setAttribute('title', bbBold.title + ' (Ctrl+B)')
bbItalic?.setAttribute('title', bbItalic.title + ' (Ctrl+I)')
bbUnderscore?.setAttribute('title', bbUnderscore.title + ' (Ctrl+U)')
bbAlliance?.setAttribute('title', bbAlliance.title + ' (Alt+A)')
bbPlayer?.setAttribute('title', bbPlayer.title + ' (Alt+P)')
bbCoordinate?.setAttribute('title', bbCoordinate.title + ' (Alt+C)')
bbReport?.setAttribute('title', bbReport.title + ' (Alt+R)')
bbPreview?.setAttribute('title', bbPreview.title + ' (Alt+Z)')

messageContainer?.addEventListener('keydown', (event) => {
    if (!event.ctrlKey)
        return

    if (event.code == 'KeyB') {
        bbBold.click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyI') {
        bbItalic.click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyU') {
        bbUnderscore.click()
        event.preventDefault()
        event.stopPropagation()
    }
})

messageContainer?.addEventListener('keydown', (event) => {
    if (!event.altKey)
        return

    if (event.code == 'KeyA') {
        bbAlliance.click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyP') {
        bbPlayer.click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyC') {
        bbCoordinate.click()
        event.preventDefault()
        event.stopPropagation()
    } else if (event.code == 'KeyR') {
        bbReport.click()
        event.preventDefault()
        event.stopPropagation()
    }
})

document.addEventListener('keydown', (event) => {
    if (!event.altKey)
        return

    if (event.code == 'KeyZ') {
        bbPreview.click()
        document.querySelector('#message')?.focus()
        event.preventDefault()
        event.stopPropagation()
    }
})



// Undo/Redo BB Codes
const mementos = []

let saveMemento = () => {
    mementos.push({
        value: messageContainer.value,
        positionStart: messageContainer.selectionStart,
        positionEnd: messageContainer.selectionEnd,
    })
}

let undo = () => {
    const lastMemento = mementos.pop()

    if (lastMemento) {
        console.log('Undo')

        messageContainer.value = lastMemento.value
        messageContainer.setSelectionRange(lastMemento.positionStart, lastMemento.positionEnd);
    }
}

messageContainer?.addEventListener('keydown', (event) => {
    if (!event.ctrlKey || event.code !== 'KeyZ')
        return true

    undo()
})

document.querySelectorAll(".bbButton").forEach(button => {
    button.addEventListener('click', (event) => {
        saveMemento()
    })
})