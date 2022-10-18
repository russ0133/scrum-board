import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../client/zustand/models/MainModel';
import { db } from '../firebase';

// Queries
async function getAllTasksFromUid(ownerId: string) {
  const Collection = collection(db, 'tasks');
  const Query = query(Collection, where('ownerId', '==', ownerId));
  const Snapshot = await getDocs(Query);
  const Data = Snapshot.docs.map((docx) => docx.data());
  return Data as Task[];
}

// Mutations
/**
 * Adds a new task document to firebase.
 * @param ownerId - Uid of the authenticated user.
 * @param name - Name of the Task.
 * @param column - Column to be added to.
 * @param status - If completed or not.
 * @returns The added document or error.
 */
async function addTask(ownerId: string, name: string, column: string, status: boolean) {
  try {
    const Collection = collection(db, 'tasks');
    const Mutation = await addDoc(Collection, { ownerId, name, column, status, taskId: uuidv4(), order: 0 });
    return Mutation;
  } catch (err) {
    return err;
  }
}

/**
 * Updates all firebase tasks with new 'order' parameter.
 * @param store - Array of tasks in state.
 * @returns
 */
async function updateAllTasksIndexes(store: Task[]) {
  for (let i = 0; i < store.length; i += 1) {
    try {
      const Collection = collection(db, 'tasks');
      const Query = query(Collection, where('taskId', '==', store[i].taskId));
      const Snapshot = await getDocs(Query);
      Snapshot.docs.map((document) => updateDoc(document.ref, { order: store[i].order }));
    } catch (err) {
      return err;
    }
  }
}

/**
 * Updates one parameter of one firebase task document.
 * @param taskId - Id of the task to be updated.
 * @param parameter - Parameter to be updated.
 * @param value - New value of the parameter.
 * @returns true if updated : error if error.
 */
async function updateTaskParam(taskId: string, parameter: string, value: any) {
  try {
    const Collection = collection(db, 'tasks');
    const Query = query(Collection, where('taskId', '==', taskId));
    const Snapshot = await getDocs(Query);
    Snapshot.docs.map((document) => updateDoc(document.ref, { [parameter]: value }));
    return true;
  } catch (err) {
    return err;
  }
}

/**
 * Removes a task from firebase collection.
 * @param taskId - Id of the task to be removed.
 * @returns true if deleted : error if error.
 */
async function removeTask(taskId: string) {
  try {
    const Collection = collection(db, 'tasks');
    const Query = query(Collection, where('taskId', '==', taskId));
    const Snapshot = await getDocs(Query);
    Snapshot.docs.map((document) => deleteDoc(document.ref));
    return true;
  } catch (err) {
    return err;
  }
}

export { getAllTasksFromUid, addTask, removeTask, updateTaskParam as updateTask, updateAllTasksIndexes };
