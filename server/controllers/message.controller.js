import { toMessage, toPublicUser } from "../serializers/index.js";
import * as messageService from "../services/message.service.js";

export async function listConversations(req, res) {
  const conversations = await messageService.listConversations(req.user.id);

  res.json({
    data: conversations.map(({ partner, lastMessage }) => ({
      partner: toPublicUser(partner),
      lastMessage: toMessage(lastMessage),
    })),
  });
}

export async function listMessages(req, res) {
  const { items, nextCursor } = await messageService.listMessages(
    req.user.id,
    req.validated.params.partnerId,
    req.validated.query,
  );
  res.json({ data: items.map(toMessage), meta: { nextCursor } });
}

export async function deleteConversation(req, res) {
  await messageService.deleteConversation(req.user.id, req.validated.params.partnerId);
  res.status(204).end();
}
