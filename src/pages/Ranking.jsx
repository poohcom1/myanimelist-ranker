import React from 'react'
import './Ranking.css'
import { ReactSortable } from "react-sortablejs";
import { getCompletedAnimeList } from '../libs/mal';
import ListItem from '../components/ListItem';
import { saveOrder, getOrder, orderList, saveUser } from '../libs/save';

export default class Ranking extends React.Component {
    /**
     * 
     * @param {string} props.user 
     */
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            maxScore: 10,
            minScore: 5
        }

        //clearOrder(this.props.user)
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
        getCompletedAnimeList(this.props.user)
            .then(rawList => {
                if (this.storedOrder) {
                    rawList = orderList(rawList, this.storedOrder)
                }

                saveUser(this.props.user)
                this.setState({ list: this.addBreaks(rawList) })
            })
            .catch(() => {
                this.setState({ list: [] })

                console.log("user not found!")
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
        return typeof(item) !== "number"
    }

    addBreaks(list) {
        list = [...list].filter(this.isItem)

        for (let i = 1; i < list.length / 10; i++) {
            list.splice(i * 10, 0, i * 10)
        }

        return list
    }

    removeBreaks(list) {
        list = [...list]

        return list.filter(this.isItem)
    }

    render() {
        let index = 0

        return (
            <div>
                <ReactSortable
                    className='list'

                    list={this.state.list}
                    setList={this.setList.bind(this)}

                    animation={100}
                    delayOnTouchStart={true}
                    delay={1}
                    filter={".separator"}

                    onMove={function (evt) {
                        if (evt.related) {
                            return !evt.related.classList.contains('separator');
                        }
                    }
                    }
                >
                    {this.state.list.map(item => (
                        <>{this.isItem(item) ? <ListItem
                            key={item.mal_id}
                            rank={index++ + 1}
                            anime={item}
                            score={this.state.maxScore - index / this.state.list.length * (this.state.maxScore - this.state.minScore)}
                        /> :
                            <div class="separator">
                                {`Top ${item}`}
                            </div>
                        }
                        </>
                    ))}

                </ReactSortable>

            </div>
        )
    }
}