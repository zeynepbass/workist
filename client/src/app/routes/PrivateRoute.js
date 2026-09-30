import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import isTokenExpired from "@/shared/utils/isTokenExpired";

function clearSession() {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
}

export default function PrivateRoute({ children }) {
  const hasSession = Boolean(localStorage.getItem("login"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      clearSession();
      window.location.href = "/";
    }
  }, [token]);

  if (!hasSession) {
    return <Navigate to="/" replace />;
  }

  return children;
}
