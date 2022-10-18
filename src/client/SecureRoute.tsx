import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMainStore from './zustand/resolvers/MainStore';

interface SecureRoutePropsInterface {
  children: React.ReactNode;
}
export default function SecureRoute({ children }: SecureRoutePropsInterface) {
  const navigate = useNavigate();
  const auth = useMainStore();

  useEffect(() => {
    if (Cookies.get('authStatus') === 'false') {
      console.log('you are not logged in');
      return navigate('/login');
    }

    auth.login();
  }, []);

  return (
    <>
      {auth.userData.loggedIn ? (
        <>
          {children}
          {null}
        </>
      ) : null}
      {null}
    </>
  );
}
