
import apiClient from "@/shared/api";

export const adsApi = {
  getAds() {
    return apiClient.get("/ilanlarim");
  },

  getAllDetail(id) {
    return apiClient.get(`/ilanlarim/${id}`);
  },

  deletedAds(id) {
    return apiClient.delete(`/ilanlarim/${id}`);
  },

  updateAds(id, post) {
    return apiClient.put(`/ilanlarim/${id}`, post);
  },

  createWorkPost(post) {
    return apiClient.post("/ilanlarim", post);
  },
};

