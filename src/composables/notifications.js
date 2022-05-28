import storage from "@/composables/storage"

// k=k-f5eb3fc8c0e3&t=Title&c=contents&u=

export const alert = async ({title, message, link, requireInteraction = true}) => {
    // chrome.notifications.create(null, {
    //     message,
    //     type: "basic",
    //     iconUrl: chrome.runtime.getURL('/favicon.png'),
    //     title,
    //     priority: 2,
    //     requireInteraction,
    // })

    let key = await storage.get('notificationsKey')

    if (!key)
        return

    let data = {
        k: key,
        t: title,
        c: message,
        u: link,
    }

    let params = new URLSearchParams(data).toString()

    fetch('https://xdroid.net/api/message?' + params)
}