import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { IconEraser } from '@tabler/icons';
import { Task } from '../zustand/models/MainModel';
import useMainStore from '../zustand/resolvers/MainStore';

interface TaskCardProp {
  item: Task;
  index: number;
  columnId: string;
}

function TaskCard({ item, index, columnId }: TaskCardProp) {
  const store = useMainStore();
  function deleteCard() {
    store.deleteTask(columnId, index);
  }
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        const draggingStyle = snapshot.isDragging ? 'border-2 border-gray-500' : '';
        return (
          <div
            className={`rounded-xl px-2 bg-neutral-50 shadow-sm py-2 my-2 items-center mx-2 flex flex-row justify-between ${draggingStyle}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>{item.content}</span>
            <div className="hover:cursor-pointer bg-red-700 rounded-full p-[2px]" onClick={deleteCard}>
              <IconEraser size={18} color="white" />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
