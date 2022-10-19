import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ColumnObject } from '../../client/zustand/models/MainModel';
import { db } from '../firebase';

// Queries
async function getUser(ownerId: string) {
  const Collection = collection(db, 'users');
  const Query = query(Collection, where('uid', '==', ownerId));
  const Snapshot = await getDocs(Query);
  const Data = Snapshot.docs.map((docx) => docx.data());
  return Data;
}

// Mutations
async function updateUserColumns(uid: string, column: ColumnObject) {
  try {
    const Collection = collection(db, 'users');
    const Query = query(Collection, where('uid', '==', uid));
    const Snapshot = await getDocs(Query);
    Snapshot.docs.map((document) => updateDoc(document.ref, { columns: column }));
    console.log('Columns updated.');
  } catch (err) {
    return err;
  }
}

export { getUser, updateUserColumns };
