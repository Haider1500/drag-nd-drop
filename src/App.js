import { useState } from "react";
import "./App.css";
import "./initialData";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";

function App() {
  const [data, setData] = useState(initialData);
  // console.log(data)

  function onDragEnd(result) {
    // console.log(result);
    const { draggableId, source, destination } = result;
    // console.log(draggableId, source, destination);
    if (!destination) return;
    if (source.id === destination.id && source.index === destination.index) {
      return;
    }
    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    const newData = {
      ...data,
      ...column,
      [newColumn.id]: newColumn,
    };
    setData(newData);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {data.columnOrder.map((columnID) => {
          const column = data.columns[columnID];
          const tasks = column.taskIds.map((task) => data.tasks[task]);
          // console.log(tasks)
          return (
            <Column
              tasks={tasks}
              title={column.title}
              key={column.id}
              id={column.id}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
