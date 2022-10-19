import React, { useEffect, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import { IconChecklist } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface, NewTask } from '../zustand/models/MainModel';

interface ColumnProps {
  name: string;
  data: ColumnInterface;
}

function Column({ name, data }: ColumnProps) {
  const taskStore = useMainStore((state) => state.userData.tasks);
  const tasks = useMainStore((state) => state.userData.newTasks);
  const defaultQty = taskStore ? taskStore.filter((task) => task.column === name).length : 0;
  const [items, setItems] = useState(defaultQty);

  const [taskList, setTaskList] = useState<NewTask[]>();

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks.filter((task) => data.taskIds.includes(task.id)));
    }

    const unsub = useMainStore.subscribe((state) => {
      setItems(state.getTaskQty(name));
    });

    return () => unsub();
  }, []);

  if (tasks)
    return (
      <div>
        <div>{name}</div>
        <Droppable droppableId={data.id}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {taskList?.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
      /*       <div className="col-span-1 bg-gray-200 shadow-sm h-max rounded-md flex flex-col w-[100%] ">
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
      </div> */
    );
  return <div>null</div>;
}
export default Column;
