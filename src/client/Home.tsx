import React, { useEffect } from 'react';

import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { Task } from './zustand/models/MainModel';

import useMainStore from './zustand/resolvers/MainStore';
import Column from './components/Column';
import { logout } from '../server/resolvers/AuthResolver';
import { getAllTasksFromUid, addTask } from '../server/resolvers/TaskResolver';

export default function Home() {
  const authStore = useMainStore();
  // hello
  const queryCollections = async () => {
    if (!authStore.userData.uid) return;
    const cities = await getAllTasksFromUid(authStore.userData.uid);
  };

  const addDocument = async () => {
    if (!authStore.userData.uid) return;
    const cities = await addTask(authStore.userData.uid, 'Test', 'todo', false);
  };

  useEffect(() => {
    async function getAllTasksOnInit() {
      if (!authStore.userData.uid) return;
      const tasks = await getAllTasksFromUid(authStore.userData.uid);
      authStore.setTasks(tasks as Task[]);
    }
    getAllTasksOnInit();
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return console.error('no destination');
    if (!authStore.userData.tasks) return console.error('no tasks');
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return console.error('wat');
    authStore.reorderTask(draggableId, source.index, destination.index);
  };

  return (
    <>
      <div className=" flex flex-col items-center gap-2">
        <h1>Debug section</h1>
        <button type="button" className="bg-blue-500 text-white" onClick={queryCollections}>
          Click here to show collection!
        </button>
        <button type="button" className="bg-green-500 text-white" onClick={addDocument}>
          Click here to add collection!
        </button>
        <button type="button" className="bg-red-500 text-white" onClick={logout}>
          Click here to log off!
        </button>
      </div>
      <h1>App section</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 bg-red-500 gap-12">
          <Column name="todo" />
          <Column name="backlog" />
          <Column name="hello" />
        </div>
      </DragDropContext>
      <div>{authStore.userData.tasks && JSON.stringify(authStore.userData.tasks, null, 2)}</div>
    </>
  );
}
