import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './client/Home';
import Login from './client/Login';
import Register from './client/Register';
import SecureRoute from './SecureRoute';

function RoutingProvider() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={
            <SecureRoute>
              <Home />
            </SecureRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RoutingProvider;
