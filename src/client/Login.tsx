import React from 'react';
import useMainStore from './zustand/resolvers/MainStore';

export default function Login() {
  const auth = useMainStore();

  const handleLogin = () => {
    auth.login();
    console.log('logged in');
    console.log(auth.userData.loggedIn);
  };

  const handleLogout = () => {
    auth.logout();
    console.log('logged out');
  };

  return (
    <div className="flex flex-col items-center p-6 gap-2">
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-500 px-2 text-white rounded-lg text-2xl shadow-md"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        type="button"
        className="bg-red-600 hover:bg-red-500 px-2 text-white rounded-lg shadow-md"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div>You are {auth.userData.loggedIn ? 'logged in' : 'NOT logged in'}</div>
    </div>
  );
}
