import React, { CSSProperties, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import ItemTypes from '../Constants';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';

interface ColumnInterface {
  name: string;
}

function Column({ name }: ColumnInterface) {
  const taskStore = useMainStore((state) => state.userData.tasks);

  if (taskStore)
    return (
      <div className="col-span-1 bg-blue-500 flex flex-col  w-[100%]">
        <Droppable droppableId={name}>
          {(provided) => (
            <div className="bg-green-500">
              <h2>{name}</h2>
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {taskStore.map((task, index) => {
                  if (task.column === name) return <TaskCard key={task.taskId} task={task} index={task.index} />;
                  return null;
                })}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </div>
    );
  return <div>null</div>;
}
export default Column;
