import React, { useEffect } from 'react';
import { TextInput, PasswordInput, Button, Group, Box, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../server/firebase';
import useMainStore from './zustand/resolvers/MainStore';
import { logInWithEmailAndPassword } from '../server/resolvers/AuthResolver';

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
      window.alert('Logged in succesfully!');
    } else {
      form.setErrors({ password: 'Email/password incorrect.' });
    }
  };

  if (!loading)
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
          <PasswordInput withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

          <Group position="right" mt="md">
            <Button size="xs" type="button" onClick={() => navigate('/register')}>
              Register
            </Button>
            <Button type="submit">Login</Button>
          </Group>
        </form>
        <Paper shadow="xs" p="sm" mt={12} withBorder>
          <Text size="sm">
            Default test email/password:
            <Text>
              <b>test@test.com</b>
            </Text>
            <Text>
              <b>123456</b>
            </Text>
          </Text>
        </Paper>
      </Box>
    );

  return <div>Loading...</div>;
}

export default Login;
