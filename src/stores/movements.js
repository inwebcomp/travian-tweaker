import {ref} from "vue"
import {executeOnActiveTab, waitPageLoad} from "@/composables/app"
import {pages} from "@/composables/page"
import {MovementType} from "@/composables/enums"
import storage from "@/composables/storage"

const movements = ref([])

const returns = () => {
    return movements.value.filter((item) => item.type == MovementType.Return)
}
const attacks = () => {
    return movements.value.filter((item) => item.type == MovementType.Attack && item.direction == 'out')
}
const dangers = () => {
    return movements.value.filter((item) => item.type == MovementType.Attack && item.direction == 'in')
}

const fetch = async (redirectIfNeeded = false) => {
    if (redirectIfNeeded) {
        await pages.movements.go()
        await waitPageLoad()
    }

    const result = await executeOnActiveTab(async () => {
        const {Resource, getInt, enums: {MovementType}} = $th

        let result = []

        document.querySelectorAll('.troop_details').forEach((item, i) => {
            let resources = {}

            if (item.classList.length == 1)
                return

            item.querySelectorAll('.res .resources').forEach(el => {
                let name

                if (el.children[0].classList.contains('r1'))
                    name = Resource.Wood
                else if (el.children[0].classList.contains('r2'))
                    name = Resource.Clay
                else if (el.children[0].classList.contains('r3'))
                    name = Resource.Iron
                else if (el.children[0].classList.contains('r4'))
                    name = Resource.Crop

                resources[name] = getInt(el.textContent)
            })

            const parseTime = (time) => {
                let part = time.split(':')
                return parseInt(part[0]) * 60 * 60 + parseInt(part[1]) * 60 + parseInt(part[2])
            }

            let type

            if (item.classList.contains('inReturn'))
                type = MovementType.Return
            else if (item.classList.contains('outRaid') || item.classList.contains('outAttack'))
                type = MovementType.Attack
            else if (item.classList.contains('inSupport') || item.classList.contains('outSupport'))
                type = MovementType.Support

            let direction = 'out'

            if (item.classList.contains('inRaid') || item.classList.contains('inAttack') || item.classList.contains('inSupport') || item.classList.contains('inReturn'))
                direction = 'in'

            result.push({
                resources,
                title: item.querySelector('.troopHeadline').textContent.trim(),
                arrive: +item.querySelector('.infos .in .timer').getAttribute('value') * 1000 - 1000 + (new Date().valueOf()),
                type,
                direction,
            })
        })

        return result
    })

    if (!result || !result.length)
        return

    movements.value = result

    return await storage.set('movements', result)
}

const init = async () => {
    let data = await storage.get('movements', [])

    if (data.movements) {
        movements.value = data.movements
    } else {
        await fetch()
    }

    return data
}

export function useMovementsStore() {
    return {
        movements,

        returns,
        attacks,
        dangers,

        init,
        fetch,
    }
}