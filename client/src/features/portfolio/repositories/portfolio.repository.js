import { toFormData } from "@/shared/api";
import { toPage } from "@/shared/api/pagination";
import portfolioAdapter from "../adapters/portfolio.adapter";
import { portfolioApi } from "../api/portfolio.api";

export async function listPortfolios({ owner = "me", status }, cursor) {
  return toPage(await portfolioApi.list({ owner, status, cursor }), portfolioAdapter);
}

export async function getPortfolio(id) {
  const { data } = await portfolioApi.get(id);
  return portfolioAdapter(data.data);
}

export async function createPortfolio({ fields, image }) {
  const { data } = await portfolioApi.create(toFormData(fields, { image }));
  return portfolioAdapter(data.data);
}

export async function updatePortfolio(id, { fields, image }) {
  const { data } = await portfolioApi.update(id, toFormData(fields, { image }));
  return portfolioAdapter(data.data);
}

export async function deletePortfolio(id) {
  await portfolioApi.remove(id);
}
