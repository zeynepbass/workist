import express from "express";

import * as messageController from "../controllers/message.controller.js";
import { validate } from "../middleware/validate.js";
import { listMessagesQuery, partnerParams } from "../validators/message.validators.js";

const router = express.Router();

router.get("/", messageController.listConversations);
router.get(
  "/:partnerId/messages",
  validate({ params: partnerParams, query: listMessagesQuery }),
  messageController.listMessages,
);
router.delete(
  "/:partnerId",
  validate({ params: partnerParams }),
  messageController.deleteConversation,
);

export default router;
