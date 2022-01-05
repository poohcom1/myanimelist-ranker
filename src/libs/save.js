
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
 * @param {MODE} mode 
 */
export function saveOrder(order, mode=MODE.ANIME) {
    localStorage.setItem(mode, JSON.stringify(order))
}

/**
 * 
 * @param {MODE} mode 
 * @returns 
 */
export function getOrder(mode = MODE.ANIME) {
    return JSON.parse(localStorage.getItem(mode))
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