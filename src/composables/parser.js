export const parseBuildingInfo = async (gid, speed = 1) => {
    let url = 'https://answers.travian.ru/index.php?view=toolkit&action=building&mb=1&speed=' + speed + '&gid=' + gid

    const response = await window.fetch(url, {
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
    })

    let text = await response.text()
    let container = document.createElement('html')
    container.innerHTML = text

    const parseTime = (time) => {
        let part = time.split(':')
        return parseInt(part[0]) * 60 * 60 + parseInt(part[1]) * 60 + parseInt(part[2])
    }

    let result = []

    container.querySelectorAll('tbody tr').forEach(tr => {
        result.push({
            level: +tr.children[0].innerText,
            wood: +tr.children[1].innerText,
            clay: +tr.children[2].innerText,
            iron: +tr.children[3].innerText,
            crop: +tr.children[4].innerText,
            consume: +tr.children[5].innerText,
            time: parseTime(tr.children[6].innerText),
            culture: +tr.children[7].innerText,
            param: tr.children[8].innerText,
        })
    })

    container.remove()

    return result
}