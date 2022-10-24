import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { useClickOutside } from '@mantine/hooks';
import { ActionIcon, Badge, Card, Center, Group, Text, TextInput } from '@mantine/core';
import { IconCheck, IconChecklist, IconPlus } from '@tabler/icons';
import { useForm } from '@mantine/form';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface } from '../zustand/models/MainModel';

interface ColumnProps {
  columnId: string;
  column: ColumnInterface;
}

function Column({ columnId, column }: ColumnProps) {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const store = useMainStore();

  const form = useForm({
    initialValues: {
      task: '',
    },
  });

  const onSubmit = (values: any) => {
    store.addTask(columnId, values.task);
  };

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
              {opened && (
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                  <Group>
                    <TextInput
                      autoFocus
                      placeholder="new "
                      radius="xl"
                      size="xs"
                      withAsterisk
                      {...form.getInputProps('task')}
                    />
                    <ActionIcon radius="xl" color="green" type="submit" variant="filled" size="sm">
                      <IconCheck size={18} />
                    </ActionIcon>
                  </Group>
                </form>
              )}
              {!opened && (
                <ActionIcon
                  radius="xl"
                  type="submit"
                  variant="filled"
                  size="sm"
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  <IconPlus size={18} />
                </ActionIcon>
              )}
            </Group>
          </Center>
        </div>
      </Card>
    </div>
  );
}
export default Column;
