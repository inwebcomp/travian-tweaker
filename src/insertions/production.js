import {getInt} from "@/tools/Browser"

const elements = document.querySelectorAll('.villageInfobox.production tbody .num')

const productions = Array.from(elements).map(el => {
    return getInt(el.innerText.trim().replace('−', '-'))
})

const stockEls = document.querySelectorAll('.stockBarButton')


productions.forEach((production, index) => {
    let el = document.createElement('div')

    const minus = production.toString()[0] == '-'

    el.innerHTML = minus ? production : '+' + production

    el.classList.add('travian-tweaker__production')

    if (minus)
        el.classList.add('travian-tweaker__production--negative')

    stockEls[index].append(el)
})