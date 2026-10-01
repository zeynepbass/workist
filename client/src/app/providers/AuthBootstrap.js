import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { privateUserAdapter } from "@/features/auth/adapters/user.adapter";
import { queryKeys, refreshSession } from "@/shared/api";

export default function AuthBootstrap({ children }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    refreshSession()
      .then(({ user }) => queryClient.setQueryData(queryKeys.me, privateUserAdapter(user)))
      .catch(() => {});
  }, [queryClient]);

  return children;
}
