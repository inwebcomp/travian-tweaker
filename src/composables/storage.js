const get = async (key, defaultValue = null) => {
    const result = await chrome.storage.local.get(key)

    return result[key] === undefined ? defaultValue : result[key]
}

const set = async (key, value) => {
    return await chrome.storage.local.set({[key]: value})
}

const getSync = async (key, defaultValue = null) => {
    const result = await chrome.storage.sync.get(key)

    return result[key] === undefined ? defaultValue : result[key]
}

const setSync = async (key, value) => {
    return await chrome.storage.sync.set({[key]: value})
}

export default {
    get,
    set,
    getSync,
    setSync,
}
