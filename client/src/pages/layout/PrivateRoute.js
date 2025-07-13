
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userid = JSON.parse(localStorage.getItem("login"));

  if (!userid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
