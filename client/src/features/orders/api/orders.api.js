import apiClient from "@/shared/api";

export const ordersApi = {
  getUserPosts() {
    return apiClient.get("/ilanlarim");
  },

  getPosts() {
    return apiClient.get("/ilanlar");
  },
};