import mongoose from "mongoose";

import { badRequest } from "./AppError.js";

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

export function encodeCursor(document, field = "createdAt") {
  const value = document[field] instanceof Date ? document[field].toISOString() : document[field];
  return Buffer.from(JSON.stringify([value, String(document._id)])).toString("base64url");
}

export function decodeCursor(cursor, field = "createdAt") {
  try {
    const [value, id] = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("invalid id");
    }

    return {
      value: field === "createdAt" || field === "sentAt" ? new Date(value) : value,
      id: new mongoose.Types.ObjectId(id),
    };
  } catch {
    throw badRequest("Geçersiz sayfalama imleci.");
  }
}

export function cursorFilter(cursor, { field = "createdAt", direction = -1 } = {}) {
  if (!cursor) {
    return {};
  }

  const { value, id } = decodeCursor(cursor, field);
  const operator = direction === -1 ? "$lt" : "$gt";

  return {
    $or: [{ [field]: { [operator]: value } }, { [field]: value, _id: { [operator]: id } }],
  };
}

export async function paginate(query, { limit, field = "createdAt", direction = -1 }) {
  const documents = await query.sort({ [field]: direction, _id: direction }).limit(limit + 1);
  const hasMore = documents.length > limit;
  const items = hasMore ? documents.slice(0, limit) : documents;

  return {
    items,
    nextCursor: hasMore ? encodeCursor(items[items.length - 1], field) : null,
  };
}
