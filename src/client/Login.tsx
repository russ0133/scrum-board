import React from 'react';
import useMainStore from './zustand/resolvers/MainStore';

export default function Login() {
  const auth = useMainStore();

  const handleLogin = () => {
    auth.login();
    console.log('logged in');
  };
  const handleLogout = () => {
    auth.logout();
    console.log('logged out');
  };
  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
