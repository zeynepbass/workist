import apiClient from "@/shared/api";

export const portfolioApi = {
  getMyPortfolios() {
    return apiClient.get("/portfolyo");
  },

  createPortfolio(portfolio) {
    return apiClient.post("/portfolyo", portfolio);
  },

  deletePortfolio(id) {
    return apiClient.delete(`/portfolyo/${id}`);
  },

  getPortfolio(id) {
    return apiClient.get(`/portfolyo/${id}`);
  },

  updatePortfolio(id, portfolio) {
    return apiClient.put(`/portfolyo/${id}`, portfolio);
  },

  updatePortfolioStatus(id, status) {
    return apiClient.patch(`/portfolyo/${id}`, { status });
  },
};
