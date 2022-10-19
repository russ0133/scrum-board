import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { NewTask, Task } from '../zustand/models/MainModel';

interface TaskCardProp {
  task: NewTask;
  index: number;
}

function TaskCard({ task, index }: TaskCardProp) {
  return (
    <div className="rounded-xl px-2">
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="w-[100%] bg-neutral-50 rounded-xl shadow-sm p-2 my-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.content}: {index}
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default TaskCard;
