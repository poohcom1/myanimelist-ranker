import React from 'react'
import './Ranking.css'
import { ReactSortable } from "react-sortablejs";
import { getCompletedAnimeList } from '../libs/mal';
import ListItem from '../components/ListItem';
import { saveOrder, getOrder, orderList, saveUser } from '../libs/save';

import LoadingPic from '../assets/anime-loading-gif-8.gif'

export default class Ranking extends React.Component {
    /**
     * 
     * @param {string} props.user 
     */
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            searching: false,
            userNotFound: false,
        }

        this.storedOrder = getOrder(this.props.user)
    }

    componentDidMount() {
        this.updateList()

    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.updateList();
        }
    }

    updateList() {
        console.log("Searching for user: " + this.props.user)

        this.setState({ searching: true, list: [] })

        getCompletedAnimeList(this.props.user)
            .then(rawList => {
                if (this.storedOrder) {
                    rawList = orderList(rawList, this.storedOrder)
                }

                saveUser(this.props.user)
                this.setState({
                    list: this.addBreaks(rawList),
                    userNotFound: false,
                    searching: false
                })
            })
            .catch(e => {
                this.setState({
                    list: [],
                    userNotFound: true,
                    searching: false
                })

                console.log("User not found!: " + e)
            })
    }

    setList(newList) {
        if (newList.length === 0) return

        newList = this.addBreaks(newList)

        this.setState({ list: newList })
        const order = this.removeBreaks(newList).map(anime => anime.mal_id)

        saveOrder(order, this.props.user)
    }

    isItem(item) {
        return typeof (item) == "object" && "mal_id" in item
    }

    addBreaks(list) {
        list = [...list].filter(this.isItem)

        for (let i = 1; i < list.length / 10 - 1; i++) {
            list.splice(i * 10 + i - 1, 0, i * 10)
        }

        return list
    }

    removeBreaks(list) {
        list = [...list]

        return list.filter(this.isItem)
    }

    render() {
        let index = 0
        let separator_index = 0

        return (
            <div>
                {this.state.list.length > 0 ?
                    <ReactSortable
                        className='list'

                        list={this.state.list}
                        setList={this.setList.bind(this)}

                        animation={100}
                        delayOnTouchStart={true}
                        delay={1}
                        filter={".separator"}

                        onMove={(evt) => {
                            if (evt.related) return !evt.related.classList.contains('separator');
                        }}
                    >
                        {this.state.list.map(item => (
                            this.isItem(item) ?
                                <ListItem
                                    key={item.mal_id}
                                    rank={index + 1}
                                    anime={item}
                                    score={this.props.maxScore - index++ * ((this.props.maxScore - this.props.minScore) / this.state.list.length)}
                                    size={25}
                                /> :
                                <div className="separator" key={`separator_${separator_index++}`}>
                                    {`Top ${item}`}
                                </div>
                        ))}

                    </ReactSortable>
                    :
                    <div className='messageScreen'>
                        <div>
                            {this.state.searching ?
                                <img src={LoadingPic} alt="Loading..."></img>
                                :
                                <p>USER NOT FOUND</p>}
                        </div>
                    </div>
                }

            </div>
        )
    }
}