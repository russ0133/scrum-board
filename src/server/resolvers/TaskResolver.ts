import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../client/zustand/models/MainModel';
import { db } from '../firebase';

// Queries
async function getAllTasksFromUid(ownerId: string) {
  const Collection = collection(db, 'tasks');
  const Query = query(Collection, where('ownerId', '==', ownerId));
  const Snapshot = await getDocs(Query);
  const Data = Snapshot.docs.map((docx) => docx.data());
  return Data;
}

// Mutations
async function addTask(ownerId: string, name: string, column: string, status: boolean) {
  try {
    const Collection = collection(db, 'tasks');
    const Mutation = await addDoc(Collection, { ownerId, name, column, status, taskId: uuidv4(), index: 0 });
    return Mutation;
  } catch (err) {
    return err;
  }
}

async function updateAllTasksIndex(tasks: Task[], ownerId: string) {
  try {
    const Collection = collection(db, 'tasks');
    const Query = query(Collection, where('ownerId', '==', ownerId));
    const Snapshot = await getDocs(Query);
    Snapshot.docs.map((docx) => docx.data());
  } catch (err) {
    return err;
  }
}
async function updateTask(taskId: string, parameter: string, value: any) {
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

export { getAllTasksFromUid, addTask, removeTask, updateTask };
