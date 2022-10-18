import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';

interface ColumnInterface {
  name: string;
}

function Column({ name }: ColumnInterface) {
  const taskStore = useMainStore((state) => state.userData.tasks);

  if (taskStore)
    return (
      <div className="col-span-1 bg-gray-100 shadow-md  rounded-sm flex flex-col w-[100%] my-12 mr">
        <div className="rounded-t-xl text-xl px-4 bg-neutral-700 font-bold text-white">{name}</div>
        <Divider />
        <Droppable droppableId={name}>
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {taskStore.map((task) => {
                if (task.column === name) return <TaskCard key={task.taskId} task={task} />;
                return null;
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    );
  return <div>null</div>;
}
export default Column;
