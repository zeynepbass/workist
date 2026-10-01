import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SocketProvider } from "@/shared/socket/SocketProvider";
import AuthBootstrap from "./AuthBootstrap";
import RealtimeSync from "./RealtimeSync";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30_000 },
    },
  });
}

export default function AppProviders({ children, queryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthBootstrap>
          <SocketProvider>
            <RealtimeSync />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            {children}
          </SocketProvider>
        </AuthBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
