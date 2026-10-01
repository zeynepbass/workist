import { Navigate } from "react-router-dom";

import { SESSION_STATUS, useSessionStore } from "@/shared/session/sessionStore";

export default function PublicOnlyRoute({ children }) {
  const status = useSessionStore((state) => state.status);

  if (status === SESSION_STATUS.authenticated) {
    return <Navigate to="/workist" replace />;
  }

  return children;
}
