import Ad from "../models/ad.model.js";
import Order from "../models/order.model.js";
import storage from "../storage/index.js";
import { AppError, badRequest, forbidden, notFound } from "../utils/AppError.js";
import { cursorFilter, paginate } from "../utils/pagination.js";
import { notifyUsers } from "../sockets/notifier.js";
import { storeDeliveryFiles } from "./file.service.js";
import { availableActions, nextStatus, roleOf } from "./orderStateMachine.js";

const PARTY_FIELDS = "firstName lastName title avatarKey rating";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const TRANSITION_ERRORS = {
  INVALID_TRANSITION: () =>
    new AppError(409, "INVALID_TRANSITION", "Sipariş bu durumdayken bu işlem yapılamaz."),
  FORBIDDEN_ROLE: () => forbidden("Bu işlemi siparişin diğer tarafı yapabilir."),
  REVISION_LIMIT_REACHED: () =>
    new AppError(409, "REVISION_LIMIT_REACHED", "Revizyon hakkı kalmadı."),
};

const populateParties = (query) =>
  query.populate("buyer", PARTY_FIELDS).populate("seller", PARTY_FIELDS);

export function describeFor(order, userId) {
  const viewerRole = roleOf(order, userId);
  return { order, viewerRole, actions: availableActions(order, viewerRole) };
}

async function findParticipantOrder(orderId, userId) {
  const order = await populateParties(Order.findById(orderId));

  if (!order || !roleOf(order, userId)) {
    throw notFound("Sipariş bulunamadı.");
  }

  return order;
}

function announce(order, action) {
  notifyUsers([order.buyer._id, order.seller._id], "order:updated", {
    orderId: String(order._id),
    status: order.status,
    action,
  });
}

export async function createOrder(buyerId, { adId, requirements }) {
  const ad = await Ad.findById(adId);

  if (!ad) {
    throw notFound("İlan bulunamadı.");
  }

  if (String(ad.owner) === String(buyerId)) {
    throw badRequest("Kendi ilanınıza sipariş veremezsiniz.");
  }

  const order = await Order.create({
    ad: ad._id,
    adTitle: ad.title,
    buyer: buyerId,
    seller: ad.owner,
    requirements,
    revisionLimit: ad.revisionCount,
    events: [{ action: "create", actor: buyerId, toStatus: "requested" }],
  });

  const populated = await populateParties(Order.findById(order._id));
  announce(populated, "create");

  return populated;
}

export async function listOrders(userId, { role, status, cursor, limit }) {
  const filter = {
    $and: [{ [role]: userId }, status ? { status } : {}, cursorFilter(cursor)],
  };

  return paginate(populateParties(Order.find(filter)), { limit });
}

export async function getOrder(orderId, userId) {
  return findParticipantOrder(orderId, userId);
}

const APPLY_ACTION = {
  offer(order, { price, deliveryDays, note }) {
    order.offer = { price, deliveryDays, note };
  },
  accept(order) {
    order.dueAt = new Date(Date.now() + order.offer.deliveryDays * DAY_IN_MS);
  },
  request_revision(order) {
    order.revisionsUsed += 1;
  },
};

export async function transition(orderId, userId, action, payload = {}, { files = [] } = {}) {
  const order = await findParticipantOrder(orderId, userId);
  const role = roleOf(order, userId);
  const result = nextStatus(order, action, role);

  if (!result.allowed) {
    throw TRANSITION_ERRORS[result.reason]();
  }

  if (action === "deliver") {
    order.deliveries.push({
      note: payload.note,
      files: await storeDeliveryFiles(files, { orderId: order._id }),
    });
  }

  APPLY_ACTION[action]?.(order, payload);

  const fromStatus = order.status;
  order.status = result.status;
  order.events.push({
    action,
    actor: userId,
    fromStatus,
    toStatus: result.status,
    note: payload.note ?? "",
  });
  await order.save();

  announce(order, action);
  return order;
}

export async function getOrderFileDownload(orderId, fileId, userId) {
  const order = await findParticipantOrder(orderId, userId);
  const file = order.deliveries
    .flatMap((delivery) => delivery.files)
    .find((item) => String(item._id) === String(fileId));

  if (!file) {
    throw notFound("Dosya bulunamadı.");
  }

  return { file, download: await storage.download(file.key, { fileName: file.name }) };
}
