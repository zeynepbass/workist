import apiClient, { toFormData } from "@/shared/api";

export const authApi = {
  login: (credentials) => apiClient.post("/api/auth/login", credentials),
  register: (registration) => apiClient.post("/api/auth/register", registration),
  logout: () => apiClient.post("/api/auth/logout"),
  me: () => apiClient.get("/api/users/me"),
  getUser: (id) => apiClient.get(`/api/users/${id}`),
  updateProfile: (changes) => apiClient.patch("/api/users/me", changes),
  updateAvatar: (file) => apiClient.put("/api/users/me/avatar", toFormData({}, { avatar: file })),
  changePassword: (passwords) => apiClient.patch("/api/users/me/password", passwords),
  deleteAccount: (password) => apiClient.delete("/api/users/me", { data: { password } }),
};
