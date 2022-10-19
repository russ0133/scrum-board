import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import RoutingProvider from './Routes';
import './client/styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={{ colorScheme: 'light' }}>
    <RoutingProvider />
  </MantineProvider>
);
