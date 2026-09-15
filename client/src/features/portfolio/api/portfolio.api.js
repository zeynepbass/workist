import apiClient from "@/shared/api";

export async function searchPosts(searchQuery) {
    const response = await apiClient.get("/ilanlar", {
        params: searchQuery
            ? { search: searchQuery }
            : {},
    });

    return response.data;
}

export async function getUserPortfolios(userId) {
    const response = await apiClient.get(`/portfolyo/${userId}`);

    return response.data;
}

export async function deletePortfolio(id) {
    const response = await apiClient.delete(`/portfolyo/${id}`);

    return response.data;
}

export async function getPortfolioDetail(id) {
    const response = await apiClient.get(`/portfolyo/${id}`);

    return response.data;
}

export async function updatePortfolio(id, formData) {
    const response = await apiClient.put(
        `/portfolyo/${id}`,
        formData
    );

    return response.data;
}
export async function updatePortfolioStatus(id, durum) {
    const response = await apiClient.patch(
        `/portfolyo/${id}`,
        { durum }
    );

    return response.data;
}