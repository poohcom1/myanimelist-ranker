import { Draggable } from "react-beautiful-dnd";

import ListItem from "../../components/ListItem";

/**
 *
 * @param {Object} props.anime
 * @returns
 */
export default function DraggableItem(props) {
  return (
    <Draggable
      {...props}
      key={props.anime.mal_id}
      draggableId={`${props.anime.mal_id}`}
      index={props.index}
    >
      {(provided, snapshot) => {
        let onGrid = props.onGrid || snapshot.isDragging;

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {onGrid ? (
              <img
                src={props.anime.image_url}
                alt={props.anime.title}
                width="120px"
              />
            ) : (
              <ListItem
                key={props.anime.mal_id}
                rank={props.index + 10}
                anime={props.anime}
                score={props.anime.score}
                size={25}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
