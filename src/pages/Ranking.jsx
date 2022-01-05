import React from 'react'
import { ReactSortable } from "react-sortablejs";
import { getCompletedAnimeList } from '../libs/mal';
import ListItem from '../components/ListItem';
import { saveOrder, getOrder, orderList } from '../libs/save';

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
            .then(list => {
                if (this.storedOrder) {
                    list = orderList(list, this.storedOrder)
                }


                this.setState({ list: list })
            })
            .catch(() => {
                this.setState({ list: [] })

                console.log("user not found!")
            })
    }

    setList(newList) {
        if (newList.length === 0) return

        this.setState({ list: newList })
        const order = newList.map(anime => anime.mal_id)

        saveOrder(order, this.props.user)
    }

    render() {
        return (
            <div>
                <ReactSortable
                    list={this.state.list}
                    setList={this.setList.bind(this)}

                    animation={100}
                    delayOnTouchStart={true}
                    delay={1}
                >
                    {this.state.list.map((item, index) => (
                        <ListItem
                            key={item.mal_id}
                            rank={index + 1}
                            anime={item}
                            score={this.state.maxScore - index / this.state.list.length * (this.state.maxScore - this.state.minScore)}
                        ></ListItem>
                    ))}

                </ReactSortable>

            </div>
        )
    }
}