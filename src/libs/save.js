
/**
 * @typedef MODE string
 */
export const MODE = {
    ANIME: "anime",
    MANGE: "manga"
}

/**
 * 
 * @param {[]} order 
 * @param {string} username
 * @param {MODE} mode 
 */
export function saveOrder(order, username, mode=MODE.ANIME) {
    localStorage.setItem(`${username}_${mode}`, JSON.stringify(order))
}

/**
 * 
 * @param {MODE} mode 
 * @param {string} username
 * @returns 
 */
export function getOrder(username, mode = MODE.ANIME) {
    return JSON.parse(localStorage.getItem(`${username}_${mode}`))
}

export function clearOrder(username, mode) {
    localStorage.clear(`${username}_${mode}`)
}

/**
 * 
 * @param {array} animeList 
 * @param {array} order 
 */
export function orderList(animeList, order) {
    const sortMap = {}

    for (let i = 0; i < animeList.length; i++) {
        sortMap[animeList[i].mal_id] = animeList[i]
    }

    const orderedList = []


    for (const id of order) {
        orderedList.push(sortMap[id])
        // todo: add leftovers
    }

    return orderedList
}

export function saveUser(user) {
    localStorage.setItem("user", user)
}

export function getUser() {
    return localStorage.getItem("user")
}

export function saveRange(range) {
    localStorage.setItem("range", JSON.stringify(range))
}

export function getRange() {
    return JSON.parse(localStorage.getItem("range")) ?? [0, 10]
}