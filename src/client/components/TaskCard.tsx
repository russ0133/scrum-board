import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

import { Draggable } from '@hello-pangea/dnd';
import ItemTypes from '../Constants';
import { Task } from '../zustand/models/MainModel';
import useMainStore from '../zustand/resolvers/MainStore';

interface TaskCardProp {
  task: Task;
  index: number;
}

function TaskCard({ task, index }: TaskCardProp) {
  return (
    <div className="w-[100%] bg-red-200 item-start">
      <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
        {(provided) => (
          <div
            className="w-[100%] bg-red-200 item-start"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text weight={500}>
              {task.name}: {index}
            </Text>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default TaskCard;
