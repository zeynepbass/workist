import { forbidden, notFound } from "../utils/AppError.js";

export async function findOwnedOrThrow(Model, id, userId, { notFoundMessage } = {}) {
  const document = await Model.findById(id);

  if (!document) {
    throw notFound(notFoundMessage);
  }

  if (String(document.owner) !== String(userId)) {
    throw forbidden();
  }

  return document;
}
