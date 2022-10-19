import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import { IconChecklist } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface, Task } from '../zustand/models/MainModel';

interface ColumnProps {
  columnId: string;
  column: ColumnInterface;
}

function Column({ columnId, column }: ColumnProps) {
  return (
    <div key={columnId}>
      <div>{column.title}</div>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {column.items.map((item, index) => (
              <TaskCard item={item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
export default Column;
