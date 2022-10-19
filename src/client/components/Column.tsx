import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Button, Divider, Group, Modal } from '@mantine/core';
import { IconChecklist, IconCirclePlus, IconPlus } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface, Task } from '../zustand/models/MainModel';

interface ColumnProps {
  columnId: string;
  column: ColumnInterface;
}

function Column({ columnId, column }: ColumnProps) {
  const [opened, setOpened] = useState(false);

  const store = useMainStore();
  function addTask() {
    store.addTask(columnId, 'Hello');
  }
  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        {/* FIXME: Add modal to decide task name after adding */}
        {/* Modal content */}
      </Modal>

      <div key={columnId} className="bg-gray-300 rounded-md flex flex-col justify-between h-max min-h-[80px] shadow-sm">
        <div className="rounded-t-md text-xl bg-neutral-700 font-bold text-white px-2 gap-1 flex flex-row items-center h-10 justify-between">
          <div className="flex flex-row items-center gap-1">
            <IconChecklist size={20} />
            {column.title}
          </div>
          <div
            onClick={addTask}
            className="bg-green-600/70 hover:bg-green-600 p-[2px] transition-colors hover:cursor-pointer rounded-full"
          >
            <IconPlus size={20} />
          </div>
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
        <div className="text-xs  px-2 mt-2 text-neutral-700 text-end  rounded-md">
          {column.items.length > 0 ? `Items here: ${column.items.length}` : 'empty list'}
        </div>
      </div>
    </div>
  );
}
export default Column;
