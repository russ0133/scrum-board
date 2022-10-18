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
      <div>
        <h2>{name}</h2>
        <Droppable droppableId={name}>
          {(provided) => (
            <div className="flex flex-col items-center text-white  w-full h-52" data-testid="dustbin">
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {taskStore.map((task, index) => {
                  if (task.column === name) return <TaskCard task={task} index={index} />;
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
