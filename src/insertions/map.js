import storage from "@/composables/storage"

const initMap = async () => {
    console.time('Map init')

    let last = await storage.get('lastMapUpdate')

    if (last + 3600 * 12 * 1000 < Date.now()) {
        await updateMap()
    }

    const data = await storage.get('map')

    window.$tt.map = data

    let players = new Map()
    let alliances = new Map()
    let coordinates = new Map()

    data.forEach(item => {
        if (!players.has(item.playerTitle)) {
            players.set(item.playerTitle, {
                id: +item.playerId,
                allianceId: +item.allianceId,
                villages: [
                    {
                        id: +item.villageId,
                        title: item.villageTitle,
                        x: +item.x,
                        y: +item.y,
                    }
                ],
            })
        } else {
            let player = players.get(item.playerTitle)

            if (!player.villages.find(player => player.id === +item.playerId))
                player.villages.push({
                    id: +item.villageId,
                    title: item.villageTitle,
                    x: +item.x,
                    y: +item.y,
                })
        }

        if (+item.allianceId) {
            if (!alliances.has(item.allianceTitle)) {
                alliances.set(item.allianceTitle, {
                    id: +item.allianceId,
                    players: [
                        {
                            id: +item.playerId,
                            title: item.playerTitle,
                        }
                    ],
                })
            } else {
                let ally = alliances.get(item.allianceTitle)

                if (!ally.players.find(player => player.id === +item.playerId))
                    ally.players.push({
                        id: +item.playerId,
                        title: item.playerTitle,
                    })
            }
        }
    })

    console.timeEnd('Map init')
}

const updateMap = () => {
    fetch('/map.sql').then(async r => {
        let body = await r.text()

        // let body = "INSERT INTO `x_world` VALUES (56,-145,200,3,28632,'02',4556,'XxMasterxX',100,'IARKT',511,NULL,TRUE,NULL,NULL);" +
        // "\nINSERT INTO `x_world` VALUES (57,-144,200,3,25473,'00',5196,'Bussy',17,'Immo',681,NULL,TRUE,NULL,NULL);" +
        // "\nINSERT INTO `x_world` VALUES (57,-144,200,3,25473,'00',5196,'Bu\'ssy',17,'Immo',681,NULL,TRUE,NULL,NULL);"

        let data = []

        let pattern = {
            villageId: {},
            x: {},
            y: {},
            _unknown1: {},
            _unknown2: {},
            villageTitle: {},
            playerId: {},
            playerTitle: {},
            allianceId: {},
            allianceTitle: {},
            population: {},
        }

        let regex = /(\(|,)?((('([^,]+)')|([0-9A-Z-]+)))(,|\))?/g

        body.split("\n").forEach(line => {
            let m = [...line.matchAll(regex)].map(v => v[5] !== undefined ? v[5] : v[3])

            let item = {}

            Object.keys(pattern).forEach((key, i) => {
                if (key[0] === '_')
                    return

                item[key] = m[i + 3]
            })

            data.push(item)
        })

        await storage.set('map', data)
        await storage.set('lastMapUpdate', Date.now())
    })
}

initMap()