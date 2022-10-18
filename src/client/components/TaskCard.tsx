import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../zustand/models/MainModel';

interface TaskCardProp {
  task: Task;
}

function TaskCard({ task }: TaskCardProp) {
  return (
    <div className="rounded-xl px-2">
      <Draggable key={task.taskId} draggableId={task.taskId} index={task.order}>
        {(provided) => (
          <div
            className="w-[100%] bg-neutral-50 rounded-xl shadow-sm p-2 my-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.name}: {task.order}
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default TaskCard;
