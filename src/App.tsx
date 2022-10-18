import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLifecycle from './client/AuthLifecycle';
import Login from './client/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthLifecycle />} />
      </Routes>
    </Router>
  );
}

export default App;
