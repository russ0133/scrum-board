import React, { useState } from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { IconAdjustments, IconEraser, IconTrash } from '@tabler/icons';
import { ActionIcon, Group, Spoiler, Text } from '@mantine/core';
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
        const draggingStyle = snapshot.isDragging ? 'bg-slate-300' : 'bg-slate-200';
        const visible = buttonsVisible ? 'visible' : 'invisible';
        return (
          <Group
            onMouseEnter={() => setButtonsVisible(true)}
            onMouseLeave={() => setButtonsVisible(false)}
            className={`rounded-xl px-2 shadow-sm py-2 -mb-4 mt-6 items-center  flex flex-row justify-between break-normal  ${draggingStyle}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Spoiler maxHeight={50} showLabel="expand" hideLabel="hide">
              <Text className="break-all">{item.content}</Text>
            </Spoiler>
            {buttonsVisible && (
              <ActionIcon radius="xl" variant="filled" size="sm" onClick={() => deleteCard()}>
                <IconTrash size={18} />
              </ActionIcon>
            )}
          </Group>
        );
      }}
    </Draggable>
  );
}

export default TaskCard;
