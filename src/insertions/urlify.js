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
