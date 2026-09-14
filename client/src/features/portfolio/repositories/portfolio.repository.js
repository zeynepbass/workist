import portfolioProvider from "@/providers/portfolio.provider";
import { portfolioAdapter } from "../portfolio.adapter";

export function SearchPosts() {
    return {
        async searchPosts(searchQuery) {
            const response =
                await portfolioProvider.searchPosts(searchQuery);

            return response.map(portfolioAdapter);
        },
    };
}

export function getUserPortfolios() {
    return {
        async getUserPortfolios(userId) {
            const response =
                await portfolioProvider.getUserPortfolios(userId);

            return response.map(portfolioAdapter);
        },
    };
}

export function deletePortfolio() {
    return {
        async deletePortfolio(id) {
            const response =
                await portfolioProvider.deletePortfolio(id);

            return response;
        },
    };
}

export function getPortfolioDetail() {
    return {
        async getPortfolioDetail(id) {
            const response =
                await portfolioProvider.getPortfolioDetail(id);

            return portfolioAdapter(response);
        },
    };
}

export function updatePortfolio() {
    return {
        async updatePortfolio(id, formData) {
            const response =
                await portfolioProvider.updatePortfolio(
                    id,
                    formData
                );

            return portfolioAdapter(response);
        },
    };
}