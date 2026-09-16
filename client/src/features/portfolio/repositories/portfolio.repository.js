import { portfolioApi } from "../api/portfolio.api";
import portfolioAdapter from "../adapters/portfolio.adapter";

export async function searchPosts(searchQuery) {
    const response = await portfolioApi.searchPosts(searchQuery);

    return response.data.map(portfolioAdapter);
}

export async function getUserPortfolios() {
    const response = await portfolioApi.getUserPortfolios();

    return response.data.map(portfolioAdapter);
}

export async function createPortfolio(data) {
    const response = await portfolioApi.createPortfolio(data);

    return portfolioAdapter(response.data);
}

export async function deletePortfolio(id) {
    const response = await portfolioApi.deletePortfolio(id);

    return response.data;
}

export async function getPortfolioDetail(id) {
    const response = await portfolioApi.getPortfolioDetail(id);

    return portfolioAdapter(response.data);
}

export async function updatePortfolio(id, formData) {
    const response = await portfolioApi.updatePortfolio(id, formData);

    return portfolioAdapter(response.data);
}

export async function updatePortfolioStatus(id, durum) {
    const response = await portfolioApi.updatePortfolioStatus(id, durum);

    return response.data;
}
