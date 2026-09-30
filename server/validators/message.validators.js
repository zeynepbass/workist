import { z } from "zod";

import { MESSAGE_MAX_LENGTH } from "../models/message.model.js";
import { objectId, paginationQuery } from "./common.js";

export const partnerParams = z.object({ partnerId: objectId });

export const listMessagesQuery = paginationQuery;

export const sendMessagePayload = z.strictObject({
  recipientId: objectId,
  text: z.string().trim().min(1).max(MESSAGE_MAX_LENGTH),
});
