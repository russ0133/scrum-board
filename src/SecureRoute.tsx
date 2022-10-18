import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './server/firebase';

interface SecureRoutePropsInterface {
  children: React.ReactNode;
}
export default function SecureRoute({ children }: SecureRoutePropsInterface) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {user ? (
        <>
          {children}
          {null}
        </>
      ) : null}
      {null}
    </>
  );
}
