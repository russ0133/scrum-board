import React, { useEffect, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import { IconChecklist } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';

interface ColumnInterface {
  name: string;
}

function Column({ name }: ColumnInterface) {
  const taskStore = useMainStore((state) => state.userData.tasks);
  const defaultQty = taskStore ? taskStore.filter((task) => task.column === name).length : 0;
  const [items, setItems] = useState(defaultQty);

  useEffect(() => {
    const unsub = useMainStore.subscribe((state) => {
      console.log(state.getTaskQty(name));
      setItems(state.getTaskQty(name));
    });

    return () => unsub();
  }, []);

  if (taskStore)
    return (
      <div className="col-span-1 bg-gray-200 shadow-sm h-max rounded-md flex flex-col w-[100%] ">
        <div className="rounded-t-md text-xl bg-neutral-700 font-bold text-white px-2 gap-2 flex flex-row items-center h-10">
          <IconChecklist size={18} />
          {name}
        </div>
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
        <div className="text-sm px-2 py-1 text-neutral-700 text-end">
          {items > 0 ? `Items here: ${items}` : 'empty list'}
        </div>
      </div>
    );
  return <div>null</div>;
}
export default Column;
