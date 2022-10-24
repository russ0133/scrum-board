import React, { useEffect } from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { registerWithEmailAndPassword } from '../server/resolvers/AuthResolver';
import useMainStore from './zustand/resolvers/MainStore';
import { auth } from '../server/firebase';

function Register() {
  const authStore = useMainStore();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      navigate('/app');
      authStore.login(user.uid);
    }
  }, [user, loading]);

  const onSubmit = (values: any) => {
    registerWithEmailAndPassword(values.name, values.email, values.password);
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput withAsterisk label="Full name" placeholder="your name" {...form.getInputProps('name')} />
        <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
        <PasswordInput withAsterisk label="Password" placeholder="password" {...form.getInputProps('password')} />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default Register;
