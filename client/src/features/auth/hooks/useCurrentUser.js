import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/api";
import { SESSION_STATUS, useSessionStore } from "@/shared/session/sessionStore";
import * as authRepository from "../repositories/auth.repository";

export function useCurrentUser() {
  const isAuthenticated = useSessionStore((state) => state.status === SESSION_STATUS.authenticated);

  const { data: user = null, isLoading, isError } = useQuery({
    queryKey: queryKeys.me,
    queryFn: authRepository.getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  return { user, userId: user?.id ?? null, firstName: user?.firstName ?? "", isLoading, isError };
}
