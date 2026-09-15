import * as portfolioApi from "@/features/portfolio/api/portfolio.api";

export default function portfolioProvider() {
  return {
    searchPosts: portfolioApi.searchPosts,
    getUserPortfolios: portfolioApi.getUserPortfolios,
    deletePortfolio: portfolioApi.deletePortfolio,
    getPortfolioDetail: portfolioApi.getPortfolioDetail,
    updatePortfolio: portfolioApi.updatePortfolio,
  };
}
