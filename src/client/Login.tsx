import React, { useEffect } from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../server/firebase';
import useMainStore from './zustand/resolvers/MainStore';

function Login() {
  const authStore = useMainStore();

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/app');
      authStore.login(user.uid);
    }
  }, [user, loading]);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onSubmit = async (values: any) => {
    const login = await logInWithEmailAndPassword(values.email, values.password);
    if (login === true) {
      console.log('Logged in succesfully!');
    } else {
      console.log('Failed with error:');
      console.log(login);
    }
  };

  if (!loading)
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
          <PasswordInput withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

          <Group position="right" mt="md">
            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Box>
    );

  return <div>Loading...</div>;
}

export default Login;
