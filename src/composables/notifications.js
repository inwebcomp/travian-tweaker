export const alert = ({title, message, requireInteraction = true}) => {
    chrome.notifications.create(null, {
        message,
        type: "basic",
        iconUrl: chrome.runtime.getURL('/favicon.png'),
        title: 'Some title',
        priority: 2,
        requireInteraction,
    })
}