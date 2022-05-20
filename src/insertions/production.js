import {getInt} from "@/tools/Browser"
import storage from "@/composables/storage"

const elements = document.querySelectorAll('.villageInfobox.production tbody .num')
const stockEls = document.querySelectorAll('.stockBarButton')

let productions = Array.from(elements).map(el => {
    return getInt(el.innerText.trim().replace('−', '-'))
})

const setProduction = (productions) => {
    productions.forEach((production, index) => {
        let el = document.createElement('div')

        const minus = production.toString()[0] === '-'

        el.innerHTML = minus ? production : '+' + production

        el.classList.add('travian-tweaker__production')

        if (minus)
            el.classList.add('travian-tweaker__production--negative')

        stockEls[index].append(el)
    })
}

let villageId = document.querySelector('.villageList .active').dataset.did

if (! productions.length) {
    storage.get('productions.' + villageId, []).then((data) => {
        setProduction(data)
    })
} else {
    storage.set('productions.' + villageId, productions)
    setProduction(productions)
}
