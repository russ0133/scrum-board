import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { DEFAULT_COLUMNS } from '../Constants';

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
      columns: DEFAULT_COLUMNS,
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
  console.log('Logged off');
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
