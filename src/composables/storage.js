const get = async (key, defaultValue = null) => {
    const result = await chrome.storage.local.get(key)

    return result[key] === undefined ? defaultValue : result[key]
}

const set = async (key, value) => {
    return await chrome.storage.local.set({[key]: value})
}

export default {
    get,
    set,
}
