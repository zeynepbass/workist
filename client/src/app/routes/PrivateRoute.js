import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("login"));
  const token = userData?.token;

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;
        
        if (decodedToken.exp < now) {
          localStorage.removeItem("login");
          window.location.href = "/";
          
        }
      } catch (err) {
        console.error("Geçersiz token", err);
        localStorage.removeItem("login");
        window.location.href = "/";
      }
    }
  }, [token]);

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
