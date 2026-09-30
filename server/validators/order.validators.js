import { z } from "zod";

import { ORDER_STATUSES } from "../services/orderStateMachine.js";
import { objectId, paginationQuery } from "./common.js";

const note = z.string().trim().max(2000).default("");

export const createOrderBody = z.strictObject({
  adId: objectId,
  requirements: z.string().trim().min(10).max(5000),
});

export const listOrdersQuery = paginationQuery.extend({
  role: z.enum(["buyer", "seller"]).default("buyer"),
  status: z.enum(ORDER_STATUSES).optional(),
});

export const offerBody = z.strictObject({
  price: z.coerce.number().min(100).max(1_000_000),
  deliveryDays: z.coerce.number().int().min(1).max(365),
  note,
});

export const noteBody = z.strictObject({ note });

export const deliverBody = z.strictObject({ note });

export const reviewBody = z.strictObject({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).default(""),
});

export const orderFileParams = z.object({ id: objectId, fileId: objectId });
