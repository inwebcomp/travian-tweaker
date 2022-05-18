// fetch('/map.sql').then(async r => {
//     let body = await r.text()
//     console.log(body)
// })

let body = "INSERT INTO `x_world` VALUES (56,-145,200,3,28632,'02',4556,'XxMasterxX',100,'IARKT',511,NULL,TRUE,NULL,NULL);\nINSERT INTO `x_world` VALUES (57,-144,200,3,25473,'00',5196,'Bussy',17,'Immo',681,NULL,TRUE,NULL,NULL);"

console.log(body)

let pattern = {
    villageId: {},
    x: {},
    y: {},
    unknown1: {},
    unknown2: {},
    villageTitle: {},
    playerId: {},
    playerTitle: {},
    allianceId: {},
    allianceTitle: {},
    population: {},
}

let regex = /VALUES \(((('([^']+)')|([^,]+)),)+?NULL\);/

body.split("\n").forEach(line => {
    console.log(line.match(regex))
})