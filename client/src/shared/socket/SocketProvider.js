import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { refreshSession } from "@/shared/api";
import { SESSION_STATUS, getAccessToken, useSessionStore } from "@/shared/session/sessionStore";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const isAuthenticated = useSessionStore((state) => state.status === SESSION_STATUS.authenticated);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const connection = io(process.env.REACT_APP_API_URL || undefined, {
      auth: (provide) => provide({ token: getAccessToken() }),
      transports: ["websocket", "polling"],
    });

    connection.on("connect_error", async (error) => {
      if (error.message !== "UNAUTHORIZED") return;

      try {
        await refreshSession();
        connection.connect();
      } catch {
        connection.disconnect();
      }
    });

    setSocket(connection);

    return () => {
      connection.removeAllListeners();
      connection.disconnect();
      setSocket(null);
    };
  }, [isAuthenticated]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}

export function useSocketEvent(event, handler) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return undefined;

    socket.on(event, handler);
    return () => socket.off(event, handler);
  }, [socket, event, handler]);
}
