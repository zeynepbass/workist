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

  account(email) {
    return apiClient.get(`/users/${email}`);
  },

  getDetails(email) {
    return apiClient.get(`/duzenle/${email}`);
  },

  updateDetails(email, formData) {
    return apiClient.put(`/duzenle/${email}`, formData);
  },
};
