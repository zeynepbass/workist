import Portfolio from "../models/portfolio.model.js";
import { removeQuietly } from "../storage/index.js";
import { notFound, validationFailed } from "../utils/AppError.js";
import { cursorFilter, paginate } from "../utils/pagination.js";
import { storeImage } from "./file.service.js";
import { findOwnedOrThrow } from "./ownership.js";

const OWNER_FIELDS = "firstName lastName title avatarKey rating";
const NOT_FOUND_MESSAGE = "Portfolyo bulunamadı.";

export async function listPortfolios(query, viewerId) {
  const owner = query.owner === "me" ? viewerId : query.owner;
  const isOwnList = String(owner) === String(viewerId);
  const status = isOwnList ? query.status : "published";

  const filter = {
    $and: [{ owner }, status ? { status } : {}, cursorFilter(query.cursor)],
  };

  return paginate(Portfolio.find(filter).populate("owner", OWNER_FIELDS), { limit: query.limit });
}

export async function getPortfolio(id, viewerId) {
  const portfolio = await Portfolio.findById(id).populate("owner", OWNER_FIELDS);

  const isVisible =
    portfolio &&
    (portfolio.status === "published" || String(portfolio.owner._id) === String(viewerId));

  if (!isVisible) {
    throw notFound(NOT_FOUND_MESSAGE);
  }

  return portfolio;
}

export async function createPortfolio(ownerId, fields, file) {
  if (!file) {
    throw validationFailed([{ path: "image", message: "Portfolyo görseli zorunludur." }]);
  }

  const imageKey = await storeImage(file, { folder: "portfolios", ownerId });
  const portfolio = await Portfolio.create({ ...fields, owner: ownerId, imageKey });

  return portfolio.populate("owner", OWNER_FIELDS);
}

export async function updatePortfolio(id, ownerId, changes, file, { log } = {}) {
  const portfolio = await findOwnedOrThrow(Portfolio, id, ownerId, {
    notFoundMessage: NOT_FOUND_MESSAGE,
  });
  const previousKey = portfolio.imageKey;

  portfolio.set(changes);

  if (file) {
    portfolio.imageKey = await storeImage(file, { folder: "portfolios", ownerId });
  }

  await portfolio.save();

  if (file) {
    await removeQuietly(previousKey, log);
  }

  return portfolio.populate("owner", OWNER_FIELDS);
}

export async function deletePortfolio(id, ownerId, { log } = {}) {
  const portfolio = await findOwnedOrThrow(Portfolio, id, ownerId, {
    notFoundMessage: NOT_FOUND_MESSAGE,
  });
  await portfolio.deleteOne();
  await removeQuietly(portfolio.imageKey, log);
}
