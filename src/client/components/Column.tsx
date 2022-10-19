import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import { IconChecklist } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface, Task } from '../zustand/models/MainModel';

interface ColumnProps {
  columnId: string;
  column: ColumnInterface;
}

function Column({ columnId, column }: ColumnProps) {
  const store = useMainStore();
  function addTask() {
    store.addTask(columnId, 'Hello');
  }
  return (
    <div key={columnId} className="bg-gray-200 rounded-md flex flex-col justify-between h-max min-h-[80px] shadow-sm">
      <div className="rounded-t-md text-xl bg-neutral-700 font-bold text-white px-2 gap-2 flex flex-row items-center h-10">
        <IconChecklist size={18} />
        {column.title}
      </div>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {column.items.map((item, index) => (
              <TaskCard item={item} index={index} key={item.id} columnId={columnId} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div className="text-sm px-2 py-1 text-neutral-700 text-end">
        {column.items.length > 0 ? `Items here: ${column.items.length}` : 'empty list'}
      </div>
      <button type="button" onClick={addTask}>
        ADD TASK
      </button>
    </div>
  );
}
export default Column;
