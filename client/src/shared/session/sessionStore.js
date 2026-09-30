import { create } from "zustand";

export const SESSION_STATUS = Object.freeze({
  loading: "loading",
  authenticated: "authenticated",
  anonymous: "anonymous",
});

export const useSessionStore = create((set) => ({
  accessToken: null,
  status: SESSION_STATUS.loading,
  startSession: (accessToken) => set({ accessToken, status: SESSION_STATUS.authenticated }),
  endSession: () => set({ accessToken: null, status: SESSION_STATUS.anonymous }),
}));

export const getAccessToken = () => useSessionStore.getState().accessToken;
