const urlify = (text) => {
    let urlRegex = /(https?:\/\/[^\s<]+)/g

    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + '</a>'
    })
}

let texts = document.querySelectorAll('.pcontent .text, #message')

texts.forEach(el => {
    el.innerHTML = urlify(el.innerHTML)
})




let interval

if (interval)
    clearInterval(interval)

interval = setInterval(() => {
    let elements = document.querySelectorAll('.coordinates')

    elements.forEach(el => {
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