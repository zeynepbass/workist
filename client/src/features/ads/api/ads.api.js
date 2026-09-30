import apiClient from "@/shared/api";

export const adsApi = {
  searchAds(params) {
    return apiClient.get("/ilanlar", { params });
  },

  getMyAds() {
    return apiClient.get("/ilanlarim");
  },

  getAd(id) {
    return apiClient.get(`/ilanlarim/${id}`);
  },

  deleteAd(id) {
    return apiClient.delete(`/ilanlarim/${id}`);
  },

  updateAd(id, ad) {
    return apiClient.put(`/ilanlarim/${id}`, ad);
  },

  createAd(ad) {
    return apiClient.post("/ilanlarim", ad);
  },
};
