import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function PrivateRoute({ children }){
  const userData = JSON.parse(localStorage.getItem("login"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decodedToken.exp < now) {
          localStorage.removeItem("login");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch (err) {
        localStorage.removeItem("login");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, [token]);

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};


