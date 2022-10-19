import React, { useEffect } from 'react';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import useMainStore from './zustand/resolvers/MainStore';
import { getUser, updateColumns } from '../server/resolvers/TaskResolver';
import { logout } from '../server/resolvers/AuthResolver';
import { DEFAULT_COLUMNS } from '../server/Constants';

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
      updateColumns(store.userData.columns, store.userData.uid);
    }
  }, [store.userData]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="w-screen bg-neutral-700 text-4xl py-2 text-gray-100 px-2 flex flex-row justify-between items-center">
        <span>Scrum</span>
        <button type="button" onClick={logout}>
          logout
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 lg:gap-12 h-full md:p-12 p-2 gap-2 ">
          {Object.entries(store.userData.columns).map(([columnId, column]) => (
            <div key={columnId}>
              <div>{column.title}</div>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>{' '}
    </div>
  );
}
