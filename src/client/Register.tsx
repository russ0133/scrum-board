import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { registerWithEmailAndPassword } from '../server/firebase';

function Register() {
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
