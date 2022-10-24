import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { useClickOutside } from '@mantine/hooks';
import { ActionIcon, Badge, Card, Center, Group, Text, TextInput } from '@mantine/core';
import { IconCheck, IconChecklist, IconPlus } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface } from '../zustand/models/MainModel';

interface ColumnProps {
  columnId: string;
  column: ColumnInterface;
}

function ColumnMantine({ columnId, column }: ColumnProps) {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const store = useMainStore();

  function addTask() {
    store.addTask(columnId, 'Hello');
  }

  return (
    <div>
      <Card shadow="sm" p="sm" radius="md">
        <Card.Section>
          <Group position="apart" style={{ paddingInline: 15, paddingBlock: 1, backgroundColor: 'gray' }}>
            <Group spacing="xs">
              <IconChecklist color="white" />
              <Text size="lg" weight="700" color="white">
                {column.title}
              </Text>
            </Group>
            <Badge color="gray" variant="light" size="xs">
              {column.items.length > 0 ? `${column.items.length} items` : 'empty'}
            </Badge>
          </Group>
        </Card.Section>
        <div className="-mt-2">
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {column.items.map((item, index) => (
                  <TaskCard item={item} index={index} key={item.id} columnId={columnId} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="mt-6">
          <Center>
            <Group spacing="xs" ref={ref}>
              {opened && <TextInput autoFocus placeholder="new " radius="xl" size="xs" withAsterisk />}
              <ActionIcon radius="xl" color="green" variant="filled" size="sm" onClick={() => setOpened(true)}>
                {opened ? <IconCheck size={18} /> : <IconPlus size={18} />}
              </ActionIcon>
            </Group>
          </Center>
        </div>
      </Card>
    </div>
  );
}
export default ColumnMantine;
