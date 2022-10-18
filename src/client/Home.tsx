import React, { useEffect } from 'react';
import { getCities, logout } from '../server/firebase';
import useMainStore from './zustand/resolvers/MainStore';

export default function Home() {
  const authStore = useMainStore((state) => state.userData);
  // hello
  const handleClick = async () => {
    const cities = await getCities();
    console.log(cities);
  };

  useEffect(() => {
    console.log(authStore);
  }, []);

  return (
    <div className=" flex flex-col items-center gap-2">
      <button type="button" className="bg-green-500 text-white" onClick={handleClick}>
        Click here to show collection!
      </button>
      <button type="button" className="bg-red-500 text-white" onClick={logout}>
        Click here to log off!
      </button>
      <div>You are home!</div>
    </div>
  );
}
