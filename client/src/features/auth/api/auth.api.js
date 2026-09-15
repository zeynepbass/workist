import apiClient from "@/shared/api";

export const authApi = {
  login(data) {
    return apiClient.post("/signin", data);
  },

  register(data) {
    return apiClient.post("/uye-ol", data);
  },

  account(email) {
    return apiClient.get(`/users/${email}`);
  },

  details(email) {
    return apiClient.get(`/duzenle/${email}`);
  },

  getMessages(userId) {
    return apiClient.get(`/konusmalar/${userId}`);
  },

  getUsers() {
    return apiClient.get("/users");
  },

  getMessageData(currentId, targetId) {
    return apiClient.get(`/${currentId}/${targetId}`);
  },

  updateDetails(email, formData) {
    return apiClient.put(`/duzenle/${email}`, formData);
  },

  getDetails(email) {
    return apiClient.get(`/duzenle/${email}`);
  },
};