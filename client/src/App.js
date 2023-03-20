import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login';
import Products from './Products';
import Layout from './Layout'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate replace to="/login" />
  };

  function PrivateRoute({ children }) {
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Layout />
              <Products handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
