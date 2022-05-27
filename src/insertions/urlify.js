const urlify = (text) => {
    let urlRegex = /(https?:\/\/[^\s<]+)/g

    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + '</a>'
    })
}

let texts = document.querySelectorAll('.pcontent .text, #message:not(.messageEditor)')

texts.forEach(el => {
    el.innerHTML = urlify(el.innerHTML)
})




let interval

if (interval)
    clearInterval(interval)

interval = setInterval(() => {
    let elements = document.querySelectorAll('.coordinates')

    elements.forEach(el => {
        if (el.tagName === 'INPUT')
            return

        if (el.dataset.ttLoaded)
            return

        if (document.querySelector('.shortcutsEnabled'))
            return

        el.dataset.ttLoaded = true
        el.dataset.text = 'Copy'
        el.classList.add('travian-tweaker__tooltip')
        el.classList.add('travian-tweaker__tooltip')

        el.addEventListener('click', (event) => {
            let result = el.innerText.replace('/[()]/', '')

            if (event.ctrlKey)
                result = '[x|y]' + result + '[/x|y]'

            navigator.clipboard?.writeText(result)

            el.dataset.text = 'Copied!'

            setTimeout(() => {
                el.dataset.text = 'Copy'
            }, 1000)
        })
    })
}, 500)




let elements

elements = document.querySelectorAll('.timer')

elements.forEach(el => {
    el.dataset.text = 'Copy'
    el.classList.add('travian-tweaker__timer')
    el.classList.add('travian-tweaker__tooltip')
    el.classList.add('travian-tweaker__tooltip')

    el.addEventListener('click', (event) => {
        let result = el.innerText.trim()

        if (event.ctrlKey)
            result = '[b]' + result + '[/b]'

        navigator.clipboard?.writeText(result)

        el.dataset.text = 'Copied!'

        setTimeout(() => {
            el.dataset.text = 'Copy'
        }, 1000)
    })
})



elements = document.querySelectorAll('.at:not(.travian-tweaker__timer) span:first-of-type')

elements.forEach(el => {
    el.dataset.text = 'Copy'
    el.classList.add('travian-tweaker__timer')
    el.classList.add('travian-tweaker__tooltip')
    el.classList.add('travian-tweaker__tooltip')

    el.addEventListener('click', (event) => {
        let result = el.innerText.trim()
        result = result.substring(result.length - 8)

        if (event.ctrlKey)
            result = '[b]' + result + '[/b]'

        navigator.clipboard?.writeText(result)

        el.dataset.text = 'Copied!'

        setTimeout(() => {
            el.dataset.text = 'Copy'
        }, 1000)
    })
})


