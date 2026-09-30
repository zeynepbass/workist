import { portfolioApi } from "../api/portfolio.api";
import portfolioAdapter from "../adapters/portfolio.adapter";

export async function getMyPortfolios() {
  const response = await portfolioApi.getMyPortfolios();

  return response.data.map(portfolioAdapter);
}

export async function createPortfolio(portfolio) {
  const response = await portfolioApi.createPortfolio(portfolio);

  return portfolioAdapter(response.data);
}

export async function deletePortfolio(id) {
  const response = await portfolioApi.deletePortfolio(id);

  return response.data;
}

export async function getPortfolio(id) {
  const response = await portfolioApi.getPortfolio(id);

  return portfolioAdapter(response.data);
}

export async function updatePortfolio(id, portfolio) {
  const response = await portfolioApi.updatePortfolio(id, portfolio);

  return portfolioAdapter(response.data);
}

export async function updatePortfolioStatus(id, status) {
  const response = await portfolioApi.updatePortfolioStatus(id, status);

  return portfolioAdapter(response.data);
}
