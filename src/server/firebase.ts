import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, where, query } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDhkCBR1AirolAxg4UfnpcOmJmK83O-Jtw',
  authDomain: 'scrum-board-c19b4.firebaseapp.com',
  projectId: 'scrum-board-c19b4',
  storageBucket: 'scrum-board-c19b4.appspot.com',
  messagingSenderId: '878334021642',
  appId: '1:878334021642:web:1c1bf93154e80c5cf40ff3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Queries
async function getAllTasksFromUid(uid: string) {
  const Collection = collection(db, 'tasks');
  const Query = query(Collection, where('uid', '==', uid));
  const Snapshot = await getDocs(Query);
  const Data = Snapshot.docs.map((doc) => doc.data());
  return Data;
}

// Mutations
async function addTask(uid: string, name: string, column: string, status: boolean) {
  try {
    const Collection = collection(db, 'tasks');
    const Mutation = await addDoc(Collection, { uid, name, column, status });
    return Mutation;
  } catch (err) {
    return err;
  }
}

//  Authentication
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      bestScore: 0,
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
  console.log('Logged off');
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout, auth, getAllTasksFromUid, addTask };
