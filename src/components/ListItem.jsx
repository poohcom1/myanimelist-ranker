import React from "react";
import "./ListItem.css"

/**
 * added_to_list: false
    airing_status: 2
    days: null
    demographics: Array []
    end_date: "2007-01-03T00:00:00+00:00"
    genres: Array(4) [ {…}, {…}, {…}, … ]
    has_episode_video: false
    has_promo_video: true
    has_video: true
    image_url: "https://cdn.myanimelist.net/images/anime/8/22059.jpg?s=2cab67bd41f37e2fbd7a1c31c72118e5"
    is_rewatching: false
    licensors: Array []
    mal_id: 101
    priority: "Low"
    rating: "PG-13"
    score: 6
    season_name: null
    season_year: null
    start_date: "2005-07-01T00:00:00+00:00"
    storage: null
    studios: Array []
    tags: null
    title: "Air"
    total_episodes: 12
    type: "TV"
    url: "https://myanimelist.net/anime/101/Air"
    video_url: "https://myanimelist.net/anime/101/Air/video"
    watch_end_date: null
    watch_start_date: null
    watched_episodes: 13​​​
    watching_status: 2
 */

export default class ListItem extends React.Component {
    /**
     * @param {Object} props.anime 
     * @param {number} props.rank
     */


    render() {
        const { anime, rank, score } = this.props

        return <div className="item">
            <div className="rank">
                {rank}
            </div>
            <img src={anime.image_url} alt={anime.title} height="25px" />
            <div className="title" >
                <a href={anime.url}>
                    {anime.title}
                </a>
            </div>
            <div className="score">
                {`Score: ${score.toFixed(2)} (${anime.score})`}
            </div>
        </div>
    }
}