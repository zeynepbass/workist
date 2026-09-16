import apiClient from "@/shared/api";

export const portfolioApi = {
  searchPosts(searchQuery) {
    return apiClient.get("/ilanlar", {
      params: searchQuery
        ? { search: searchQuery }
        : {},
    });
  },

  getUserPortfolios() {
    return apiClient.get("/portfolyo");
  },

  createPortfolio(data) {
    return apiClient.post("/portfolyo", data);
  },

  deletePortfolio(id) {
    return apiClient.delete(`/portfolyo/${id}`);
  },

  getPortfolioDetail(id) {
    return apiClient.get(`/portfolyo/${id}`);
  },

  updatePortfolio(id, formData) {
    return apiClient.put(`/portfolyo/${id}`, formData);
  },

  updatePortfolioStatus(id, durum) {
    return apiClient.patch(`/portfolyo/${id}`, { durum });
  },
};
