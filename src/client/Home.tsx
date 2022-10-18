import React, { useEffect } from 'react';

import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { Task } from './zustand/models/MainModel';

import useMainStore from './zustand/resolvers/MainStore';
import Column from './components/Column';
import { logout } from '../server/resolvers/AuthResolver';
import { getAllTasksFromUid, addTask } from '../server/resolvers/TaskResolver';

export default function Home() {
  const store = useMainStore();

  const queryCollections = async () => {
    if (!store.userData.uid) return;
    const cities = await getAllTasksFromUid(store.userData.uid);
  };

  const addDocument = async () => {
    if (!store.userData.uid) return;
    const cities = await addTask(store.userData.uid, 'Test', 'todo', false);
  };

  useEffect(() => {
    /** - Orders the array based on the order property. */
    function order(a: Task, b: Task) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    }

    /** - Fetches all Tasks from Firebase. */
    async function getAllTasksOnInit() {
      if (!store.userData.uid) return;
      const tasks = await getAllTasksFromUid(store.userData.uid);
      tasks.sort((a: Task, b: Task) => order(a, b));

      store.setTasks(tasks as Task[]);
    }

    getAllTasksOnInit();
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    console.log(destination);
    if (!destination) return console.error('no destination');
    if (!store.userData.tasks) return console.error('no tasks');
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return console.error('destination and source is the same.');

    store.reorderTask(draggableId, source.index, destination.index, destination.droppableId);
  };

  return (
    <>
      {/*       <div className=" flex flex-col items-center gap-2">
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
      <h1>App section</h1> */}
      <div className="h-screen flex flex-col justify-between">
        <div className="w-screen bg-neutral-700 text-4xl py-2 text-gray-100 px-2 flex flex-row justify-between items-center">
          <span>Scrum</span>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 lg:gap-12 h-full md:p-12 p-2 gap-2 ">
            <Column name="todo" />
            <Column name="backlog" />
            <Column name="hello" />
          </div>
        </DragDropContext>{' '}
      </div>
    </>
  );
}
