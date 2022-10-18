import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
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

async function getCities() {
  const citiesCollection = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCollection);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

async function getCitiess() {
  const citiesCollection = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCollection);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

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

export { getCities, getCitiess, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, auth };
