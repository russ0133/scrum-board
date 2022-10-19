import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutingProvider from './Routes';
import './client/styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RoutingProvider />);
