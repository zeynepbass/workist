import express from "express";

import {
  deleteMessagesBetweenUsers,
  listConversations,
  listMessagesBetweenUsers,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/mesajlar/:senderId/:recipientId", listMessagesBetweenUsers);
router.get("/konusmalar/:userId", listConversations);
router.delete("/:senderId/:recipientId", deleteMessagesBetweenUsers);

export default router;
