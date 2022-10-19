import React, { useState } from 'react';

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
  const [buttonsVisible, setButtonsVisible] = useState(false);
  function deleteCard() {
    store.deleteTask(columnId, index);
  }
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        const draggingStyle = snapshot.isDragging ? 'border-2 border-gray-500' : '';
        const visible = buttonsVisible ? 'visible' : 'invisible';
        return (
          <div
            onMouseEnter={() => setButtonsVisible(true)}
            onMouseLeave={() => setButtonsVisible(false)}
            className={`rounded-xl px-2 bg-neutral-50 shadow-sm py-2 my-2 items-center mx-2 flex flex-row justify-between ${draggingStyle}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>{item.content}</span>
            <div
              className={`hover:cursor-pointer bg-red-800/50 hover:bg-red-800 transition-colors  rounded-full p-[2px]   ${visible}`}
              onClick={deleteCard}
            >
              <IconEraser size={17} color="white" />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
