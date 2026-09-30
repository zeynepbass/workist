import apiClient from "@/shared/api";

export const authApi = {
  me() {
    return apiClient.get("/me");
  },

  login(data) {
    return apiClient.post("/signin", data);
  },

  register(data) {
    return apiClient.post("/uye-ol", data);
  },

  deleteAccount(email) {
    return apiClient.delete(`/users/${encodeURIComponent(email)}`);
  },

  updateProfile(email, profile) {
    return apiClient.put(`/duzenle/${encodeURIComponent(email)}`, profile);
  },
};
