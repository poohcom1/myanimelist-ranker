import React from "react";
import "./RankingList.css";
import { ReactSortable } from "react-sortablejs";
import ListItem from "../../components/ListItem";
import { saveOrder, getOrder, orderList } from "../../libs/save";
import withPromiseLoading from "../../hoc/PromiseLoader";

class RankingList extends React.Component {
  /**
   *
   * @param {Array} props.promiseData
   */
  constructor(props) {
    super(props);

    this.state = {
      list: this.initList(),
    };

    this.storedOrder = null;
  }

  initList() {
    this.storedOrder = getOrder(this.props.user);

    let list = this.props.promiseData;

    if (this.storedOrder) {
      list = orderList(list, this.storedOrder);
    }

    return addBreaks(list);
  }

  setList(newList) {
    if (newList.length === 0) return;

    newList = addBreaks(newList);

    this.setState({ list: newList });
    const order = removeBreaks(newList).map((anime) => anime.mal_id);

    saveOrder(order, this.props.user);
  }

  render() {
    let index = 0;
    let separator_index = 0;

    return (
      <ReactSortable
        className="list"
        list={this.state.list}
        setList={this.setList.bind(this)}
        animation={50}
        delayOnTouchStart={true}
        delay={1}
        filter={".separator"}
        onMove={(evt) => {
          if (evt.related) return !evt.related.classList.contains("separator");
        }}
      >
        {this.state.list.map((item) =>
          isItem(item) ? (
            <ListItem
              key={item.mal_id}
              rank={index + 1}
              anime={item}
              score={`Score: ${(
                this.props.maxScore -
                index++ *
                  ((this.props.maxScore - this.props.minScore) /
                    this.state.list.length)
              ).toFixed(2)} (${item.score})`}
              size={25}
            />
          ) : (
            <div className="separator" key={`separator_${separator_index++}`}>
              {`Top ${item}`}
            </div>
          )
        )}
      </ReactSortable>
    );
  }
}

function addBreaks(list) {
  list = [...list].filter(isItem);

  const length = list.length / 10;

  for (let i = 1; i < length; i++) {
    list.splice(i * 10 + i - 1, 0, i * 10);
  }

  return list;
}

function removeBreaks(list) {
  list = [...list];

  return list.filter(isItem);
}

function isItem(item) {
  return typeof item == "object" && "mal_id" in item;
}

export default withPromiseLoading(RankingList);
