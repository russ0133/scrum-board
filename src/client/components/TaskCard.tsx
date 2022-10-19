import React from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../zustand/models/MainModel';

interface TaskCardProp {
  item: Task;
  index: number;
}

function TaskCard({ item, index }: TaskCardProp) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            minHeight: '50px',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            color: 'white',
            ...provided.draggableProps.style,
          }}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
