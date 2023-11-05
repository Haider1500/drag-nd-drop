import React from "react";
import Task from "./Task";
import "./App.css";
import { Droppable } from "@hello-pangea/dnd";

function Column(props) {
  return (
    <div className="column">
      <h3>{props.title}</h3>
      <Droppable droppableId={props.id}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} id={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
