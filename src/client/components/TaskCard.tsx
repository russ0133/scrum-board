import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

import { useDrag } from 'react-dnd';
import ItemTypes from '../Constants';

interface TasksProps {
  name: string;
}
interface DropResult {
  name: string;
}
function TaskCard({ name }: TasksProps) {
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
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder ref={drag}>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}

export default TaskCard;
