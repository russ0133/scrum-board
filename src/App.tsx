import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './client/Home';
import Login from './client/Login';
import SecureRoute from './client/SecureRoute';
import useMainStore from './client/zustand/resolvers/MainStore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
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

export default App;
