import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function Task(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.task.content}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
