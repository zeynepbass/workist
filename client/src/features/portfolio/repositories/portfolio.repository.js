
import portfolioProvider from "@/providers/portfolio.provider";
import portfolioAdapter from "../adapters/portfolio.adapter";

export async function searchPosts(searchQuery) {
    const response =
        await portfolioProvider.searchPosts(searchQuery);

    return response.map(portfolioAdapter);
}

export async function getUserPortfolios(userId) {
    const response =
        await portfolioProvider.getUserPortfolios(userId);

    return response.map(portfolioAdapter);
}

export async function deletePortfolio(id) {
    return await portfolioProvider.deletePortfolio(id);
}

export async function getPortfolioDetail(id) {
    const response =
        await portfolioProvider.getPortfolioDetail(id);

    return portfolioAdapter(response);
}

export async function updatePortfolio(id, formData) {
    const response =
        await portfolioProvider.updatePortfolio(id, formData);

    return portfolioAdapter(response);
}

export async function updatePortfolioStatus(id, durum) {
    return await portfolioProvider.updatePortfolioStatus(
        id,
        durum
    );
}

