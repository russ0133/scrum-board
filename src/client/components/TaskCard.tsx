import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

import { useDrag } from 'react-dnd';
import ItemTypes from '../Constants';
import { Task } from '../zustand/models/MainModel';
import useMainStore from '../zustand/resolvers/MainStore';

interface TaskCardProp {
  task: Task;
}
interface DropResult {
  name: string;
}
function TaskCard({ task }: TaskCardProp) {
  const { name } = task;
  const taskStore = useMainStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const onRemove = () => {
    taskStore.removeTask(task.taskId);
  };
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder ref={drag}>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{task.name}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      <Button color="red" fullWidth mt="md" radius="md" onClick={onRemove}>
        Delete
      </Button>
    </Card>
  );
}

export default TaskCard;
