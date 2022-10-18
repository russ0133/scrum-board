import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
export { getCities, getCitiess };
