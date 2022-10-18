import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getCities } from '../server/firebase';
import useMainStore from './zustand/resolvers/MainStore';

export default function Home() {
  const auth = useMainStore();
  const navigate = useNavigate();
  // hello
  const handleClick = async () => {
    const cities = await getCities();
    console.log(cities);
  };

  const logoff = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className=" flex flex-col items-center gap-2">
      <button type="button" className="bg-green-500 text-white" onClick={handleClick}>
        Click here to show collection!
      </button>
      <button type="button" className="bg-red-500 text-white" onClick={logoff}>
        Click here to log off!
      </button>
      <div>You are home!</div>
    </div>
  );
}
