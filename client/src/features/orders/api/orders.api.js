import apiClient from "@/shared/api";

export const ordersApi = {
  getUserPosts(userId) {
    return apiClient.get(`/ilanlarim/${userId}`);
  },

  getPosts() {
    return apiClient.get("/ilanlar");
  },
};