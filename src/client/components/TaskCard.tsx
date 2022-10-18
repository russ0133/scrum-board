import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../zustand/models/MainModel';

interface TaskCardProp {
  task: Task;
}

function TaskCard({ task }: TaskCardProp) {
  return (
    <div className="px-4 rounded-xl">
      <Draggable key={task.taskId} draggableId={task.taskId} index={task.order}>
        {(provided) => (
          <div
            className="w-[100%] mt-2 bg-white rounded-xl shadow p-2"
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
