import React, { useState } from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { IconEraser, IconTrash } from '@tabler/icons';
import { Paper, Text } from '@mantine/core';
import { Task } from '../zustand/models/MainModel';
import useMainStore from '../zustand/resolvers/MainStore';

interface TaskCardProp {
  item: Task;
  index: number;
  columnId: string;
}

function TaskCardMantine({ item, index, columnId }: TaskCardProp) {
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
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper shadow="xs" p="xs" radius="lg">
              <Text>{item.content}</Text>
            </Paper>
          </div>
        );
      }}
    </Draggable>
  );
}

export default TaskCardMantine;
