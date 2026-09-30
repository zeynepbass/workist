export const ORDER_STATUSES = Object.freeze([
  "requested",
  "offered",
  "active",
  "delivered",
  "revision_requested",
  "completed",
  "cancelled",
]);

export const ORDER_ACTIONS = Object.freeze([
  "offer",
  "accept",
  "deliver",
  "request_revision",
  "complete",
  "cancel",
]);

const TRANSITIONS = Object.freeze({
  requested: {
    offer: { role: "seller", to: "offered" },
    cancel: { role: "any", to: "cancelled" },
  },
  offered: {
    offer: { role: "seller", to: "offered" },
    accept: { role: "buyer", to: "active" },
    cancel: { role: "any", to: "cancelled" },
  },
  active: {
    deliver: { role: "seller", to: "delivered" },
    cancel: { role: "seller", to: "cancelled" },
  },
  delivered: {
    request_revision: { role: "buyer", to: "revision_requested" },
    complete: { role: "buyer", to: "completed" },
  },
  revision_requested: {
    deliver: { role: "seller", to: "delivered" },
  },
  completed: {},
  cancelled: {},
});

export function roleOf(order, userId) {
  const id = String(userId);

  if (String(order.buyer?._id ?? order.buyer) === id) return "buyer";
  if (String(order.seller?._id ?? order.seller) === id) return "seller";

  return null;
}

export function nextStatus(order, action, role) {
  const rule = TRANSITIONS[order.status]?.[action];

  if (!rule) {
    return { allowed: false, reason: "INVALID_TRANSITION" };
  }

  if (rule.role !== "any" && rule.role !== role) {
    return { allowed: false, reason: "FORBIDDEN_ROLE" };
  }

  if (action === "request_revision" && order.revisionsUsed >= order.revisionLimit) {
    return { allowed: false, reason: "REVISION_LIMIT_REACHED" };
  }

  return { allowed: true, status: rule.to };
}

export function availableActions(order, role) {
  if (!role) {
    return [];
  }

  return ORDER_ACTIONS.filter((action) => nextStatus(order, action, role).allowed);
}

export function transitionTable() {
  return TRANSITIONS;
}
