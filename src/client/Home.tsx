import React, { useEffect } from 'react';

import { DragDropContext } from '@hello-pangea/dnd';
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
    console.log(cities);
  };

  const addDocument = async () => {
    if (!authStore.userData.uid) return;
    const cities = await addTask(authStore.userData.uid, 'Test', 'todo', false);
    console.log(cities);
  };

  useEffect(() => {
    async function getAllTasksOnInit() {
      if (!authStore.userData.uid) return;
      const tasks = await getAllTasksFromUid(authStore.userData.uid);
      authStore.setTasks(tasks as Task[]);
      console.log(tasks);
    }
    getAllTasksOnInit();
  }, []);

  const onDragEnd = (result: any) => {
    console.log(result);
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
      <DragDropContext onDragStart={console.log} onDragEnd={onDragEnd}>
        <div className="">
          <div className="grid grid-cols-3 bg-red-500 gap-4">
            <Column name="todo" />
            <Column name="backlog" />
            <Column name="hello" />
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
