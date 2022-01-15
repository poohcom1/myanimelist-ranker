import React from "react";
import styled from "styled-components";
import withPromiseLoading from "../../hoc/PromiseLoader";
import { getCompletedAnimeList } from "../../libs/mal";
import { getOrder, orderList } from "../../libs/save";
import SelectableImage from "./SelectableImage";

const MainDiv = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
  }

  .box {
    width: 10vw;
    height: 10vw;
    border: 1px black solid;
    padding: 0;
    overflow: hidden;
  }
`;

const PureThreeByThree = withPromiseLoading(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        list: orderList(this.props.promiseData, getOrder(this.props.user)),
        selected: -1,
      };

      this.setSelected = this.setSelected.bind(this);
    }

    setSelected(id) {
      if (this.state.selected === -1) {
        this.setState({ selected: id });
      } else if (id === this.state.selected) {
        this.setState({ selected: -1 });
      } else {
        const list = this.state.list;

        const temp = list[id];
        list[id] = list[this.state.selected];
        list[this.state.selected] = temp;

        this.setState({ selected: -1, list });
      }
    }

    render() {
      const gridBoxes = [];

      for (let i = 0; i < 3; i++) {
        let rowBoxes = [];
        for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          const anime = this.state.list[index];
          rowBoxes.push(
            <div className="box" key={index}>
              <SelectableImage
                id={index}
                selectedId={this.state.selected}
                anime={anime}
                setSelected={this.setSelected}
              />
            </div>
          );
        }

        gridBoxes.push(
          <div key={i} className="row">
            {rowBoxes}
          </div>
        );
      }

      return (
        <MainDiv>
          <Grid>{gridBoxes}</Grid>
        </MainDiv>
      );
    }
  }
);

export default function ThreeByThree(props) {
  return (
    <>
      <PureThreeByThree
        user={props.user}
        promise={getCompletedAnimeList(props.user)}
        deps={[props.user]}
        errMessage={"User not found"}
      />
    </>
  );
}
