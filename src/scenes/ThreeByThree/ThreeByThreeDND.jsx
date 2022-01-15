import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import withPromiseLoading from "../../hoc/PromiseLoader";
import { getCompletedAnimeList } from "../../libs/mal";
import DraggableItem from "./DraggableItem";

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

  img {
    margin: 0;
    width: 10vw;
    height: 10vw;
    object-fit: cover;
  }
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PureThreeByThree = withPromiseLoading(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        grid: this.props.promiseData.slice(0, 9),
        list: this.props.promiseData.slice(9, this.props.promiseData.length),
      };

      this.onDragUpdate = this.onDragUpdate.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
    }

    getList(id) {
      if (id.includes("list")) {
        return this.state.list;
      } else {
        return this.state.grid;
      }
    }

    isList(id) {
      return id.includes("list");
    }

    onDragUpdate(result) {
      //console.log(result);
    }

    onDragEnd(result) {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId.includes("list")) {
          const list = reorder(
            this.state.list,
            source.index,
            destination.index
          );

          this.setState({
            list,
          });
        }
      } else if (
        !this.isList(source.droppableId) &&
        !this.isList(destination.droppableId)
      ) {
        const sourceInd = parseInt(source.droppableId);
        const destInd = parseInt(destination.droppableId);

        console.log(sourceInd, destInd);

        const grid = this.state.grid;

        const temp = grid[sourceInd];
        grid[sourceInd] = grid[destInd];
        grid[destInd] = temp;

        this.setState({ grid });
      } else {
        const sourceList = this.getList(source.droppableId);
        const destList = this.getList(destination.droppableId);

        const temp = sourceList[source.index];

        sourceList[source.index] = destList[destination.index];

        destList[destination.index] = temp;

        if (source.droppableId.includes("list")) {
          this.setState({ list: sourceList, grid: destList });
        } else {
          this.setState({ list: destList, grid: sourceList });
        }
      }
    }

    render() {
      const gridBoxes = [];

      for (let i = 0; i < 3; i++) {
        let rowBoxes = [];
        for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          const anime = this.state.grid[index];
          rowBoxes.push(
            <Droppable key={index} droppableId={`${index}`}>
              {(provided) => (
                <div
                  className="box"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <DraggableItem
                    key={anime.mal_id}
                    draggableId={`${anime.mal_id}`}
                    index={index}
                    anime={anime}
                    onGrid={true}
                  />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
          <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragUpdate={this.onDragUpdate}
          >
            <Grid>{gridBoxes}</Grid>

            <Droppable droppableId={"list"}>
              {(provided) => (
                <div
                  className="box"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.state.list.map((anime, index) => (
                    <DraggableItem
                      key={anime.mal_id}
                      draggableId={`${anime.mal_id}`}
                      index={index}
                      anime={anime}
                      onGrid={false}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </MainDiv>
      );
    }
  }
);

export default function ThreeByThree(props) {
  return (
    <>
      <PureThreeByThree
        promise={getCompletedAnimeList(props.user)}
        deps={[props.user]}
        errMessage={"User not found"}
      />
    </>
  );
}
