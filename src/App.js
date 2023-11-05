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
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      const newTaskIds = Array.from(start?.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      console.log(newColumn, "newColumn here");
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      console.log(newData, "new Data here ");
      setData(newData);
      return;
    }

    const sourceTaskIds = [...start?.taskIds];
    sourceTaskIds.splice(source.index, 1);
    const sourceColumn = {
      ...start,
      taskIds: sourceTaskIds,
    };
    const endTaskIds = [...end?.taskIds];
    endTaskIds.splice(destination.index, 0, draggableId);
    const endColumn = {
      ...end,
      taskIds: endTaskIds,
    };
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn.id]: sourceColumn,
        [endColumn.id]: endColumn,
      },
    };
    setData(newData);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {data.columnOrder.map((columnID) => {
          const column = data.columns[columnID];
          console.log(column, "column");
          const tasks = column?.taskIds.map((taskId) => data.tasks[taskId]);
          console.log(tasks);
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
