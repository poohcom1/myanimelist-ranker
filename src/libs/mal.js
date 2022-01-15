import { Jikan } from "node-myanimelist"

export async function getCompletedAnimeList(user) {
    const list = await Jikan.user(user).animelist().all()

    return list.anime
        .filter(anime => anime.score && anime.watching_status === 2)
        .sort((a, b) => b.score - a.score)
}