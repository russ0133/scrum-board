import React, { useEffect } from 'react';

import { DragDropContext } from '@hello-pangea/dnd';

import { AppShell, Header, Title, SimpleGrid, Container, Group, Button } from '@mantine/core';
import useMainStore from './zustand/resolvers/MainStore';
import { getUser, updateUserColumns } from '../server/resolvers/TaskResolver';
import { DEFAULT_COLUMNS } from '../server/Constants';
import Column from './components/Column';
import { ColumnInterface } from './zustand/models/MainModel';

export default function Home() {
  const store = useMainStore();
  useEffect(() => {
    /** - Fetches all Tasks from Firebase. */
    async function getAllTasksOnInit() {
      if (store.userData.uid) {
        const data = await getUser(store.userData.uid);
        let userColumns = data[0].columns;

        if (Object.keys(userColumns).length === 0) {
          //  => If the fetched data is empty, set default.
          userColumns = DEFAULT_COLUMNS;
        }

        //  => Transforms the Object into an array so it can be sorted.
        const sortable = [];
        for (const col in userColumns) {
          sortable.push([col, userColumns[col]]);
        }
        sortable.sort();
        console.log('sortable:', sortable);

        const obj = Object.fromEntries(
          sortable.map((year: any) => [
            year[0],
            {
              ...year[1],
            },
          ])
        );

        // ---

        store.setColumn(obj);
      }
    }

    getAllTasksOnInit();
    console.log('Init');
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const { columns } = store.userData;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      store.setColumn({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      store.setColumn({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    if (store.userData.columns && store.userData.uid) {
      updateUserColumns(store.userData.uid, store.userData.columns);
    }
  }, [store.userData]);

  return (
    <AppShell
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Title color="gray">Scrum</Title>
            <Button color="red" radius="lg" compact onClick={() => store.logout()}>
              Logout
            </Button>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container>
        <SimpleGrid cols={3}>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(store.userData.columns).map(([columnId, column]) => (
              <Column columnId={columnId} column={column as ColumnInterface} key={columnId} />
            ))}
          </DragDropContext>{' '}
        </SimpleGrid>
      </Container>
    </AppShell>
  );
}
