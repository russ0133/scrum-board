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
interface DropResult {
  name: string;
}

function TaskCard({ task, index }: TaskCardProp) {
  return (
    <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
        >
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{task.name}</Text>
          </Group>

          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
            around the fjords of Norway
          </Text>

          <Button color="red" fullWidth mt="md" radius="md">
            Delete
          </Button>
        </Card>
      )}
    </Draggable>
  );
}

export default TaskCard;
