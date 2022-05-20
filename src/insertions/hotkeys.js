// Messages
const messageContainer = document.querySelector('#message, #text')

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
let mementos = []

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
    if (event.ctrlKey && event.code === 'KeyZ') {
        undo()
    } else if (!event.ctrlKey && !event.altKey && mementos.length) {
        const lastMemento = mementos[mementos.length - 1]

        if (lastMemento.value !== messageContainer.value)
            mementos = []
    }
})

document.querySelectorAll(".bbButton").forEach(button => {
    button.addEventListener('click', (event) => {
        saveMemento()
    })
})


let undoButton = document.createElement('button')
undoButton.classList.add('icon', 'bbButton', 'travian-tweaker__bbButton')
undoButton.setAttribute('title', 'Undo (Ctrl+Z)')

const img = document.createElement('img')
img.src = chrome.runtime.getURL('img/icons/undo.svg')
img.style.background = 'none'
undoButton.append(img)

undoButton.addEventListener('click', (event) => {
    undo()
    event.preventDefault()
    event.stopPropagation()
})

bbPreview.parentElement.insertBefore(undoButton, bbPreview)





// Close modal on Escape
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        document.querySelector('#dialogCancelButton')?.click()
    }
})
