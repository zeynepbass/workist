import  {portfolioApi} from "@/features/portfolio/api/portfolio.api";

const portfolioProvider = {
    searchPosts: portfolioApi.searchPosts,
    getUserPortfolios: portfolioApi.getUserPortfolios,
    deletePortfolio: portfolioApi.deletePortfolio,
    getPortfolioDetail: portfolioApi.getPortfolioDetail,
    updatePortfolio: portfolioApi.updatePortfolio,
    updatePortfolioStatus:portfolioApi.updatePortfolioStatus,
};

export default portfolioProvider;