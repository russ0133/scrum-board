import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTask, getAllTasksFromUid, logout } from '../server/firebase';
import { Task } from './zustand/models/MainModel';

import useMainStore from './zustand/resolvers/MainStore';

export default function Home() {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
    getAllTasksOnInit();
  }, []);

  return (
    <div className=" flex flex-col items-center gap-2">
      <button type="button" className="bg-blue-500 text-white" onClick={queryCollections}>
        Click here to show collection!
      </button>
      <button type="button" className="bg-green-500 text-white" onClick={addDocument}>
        Click here to add collection!
      </button>
      <button type="button" className="bg-red-500 text-white" onClick={logout}>
        Click here to log off!
      </button>
      <div>Heres your tasks:</div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        authStore.userData.tasks?.map((task) => <div key={uuidv4()}>{task.name}</div>)
      )}
    </div>
  );
}
