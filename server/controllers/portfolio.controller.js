import { toPortfolio } from "../serializers/index.js";
import * as portfolioService from "../services/portfolio.service.js";

export async function listPortfolios(req, res) {
  const { items, nextCursor } = await portfolioService.listPortfolios(
    req.validated.query,
    req.user.id,
  );
  res.json({ data: items.map(toPortfolio), meta: { nextCursor } });
}

export async function getPortfolio(req, res) {
  const portfolio = await portfolioService.getPortfolio(req.validated.params.id, req.user.id);
  res.json({ data: toPortfolio(portfolio) });
}

export async function createPortfolio(req, res) {
  const portfolio = await portfolioService.createPortfolio(
    req.user.id,
    req.validated.body,
    req.file,
  );
  res.status(201).json({ data: toPortfolio(portfolio) });
}

export async function updatePortfolio(req, res) {
  const portfolio = await portfolioService.updatePortfolio(
    req.validated.params.id,
    req.user.id,
    req.validated.body,
    req.file,
    { log: req.log },
  );
  res.json({ data: toPortfolio(portfolio) });
}

export async function deletePortfolio(req, res) {
  await portfolioService.deletePortfolio(req.validated.params.id, req.user.id, { log: req.log });
  res.status(204).end();
}
