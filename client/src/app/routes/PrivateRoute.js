import { Navigate, useLocation } from "react-router-dom";

import { StatusMessage } from "@/shared/components/molecules";
import { SESSION_STATUS, useSessionStore } from "@/shared/session/sessionStore";

export default function PrivateRoute({ children }) {
  const status = useSessionStore((state) => state.status);
  const location = useLocation();

  if (status === SESSION_STATUS.loading) {
    return <StatusMessage type="loading" message="Oturum kontrol ediliyor..." />;
  }

  if (status === SESSION_STATUS.anonymous) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
