import { publicUrlFor } from "../storage/index.js";

const idOf = (value) => (value?._id ?? value)?.toString() ?? null;

const ratingOf = (rating) => ({
  average: Math.round((rating?.average ?? 0) * 10) / 10,
  count: rating?.count ?? 0,
});

export function toPublicUser(user) {
  if (!user || typeof user !== "object" || !user._id) {
    return null;
  }

  return {
    id: idOf(user),
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    title: user.title ?? "",
    avatarUrl: publicUrlFor(user.avatarKey),
    rating: ratingOf(user.rating),
  };
}

export function toPrivateUser(user) {
  return {
    ...toPublicUser(user),
    email: user.email,
    phone: user.phone ?? "",
    about: user.about ?? "",
    skills: user.skills ?? [],
    certificates: user.certificates ?? [],
    createdAt: user.createdAt,
  };
}

export function toAd(ad) {
  return {
    id: idOf(ad),
    ownerId: idOf(ad.owner),
    owner: toPublicUser(ad.owner),
    serviceType: ad.serviceType,
    title: ad.title,
    description: ad.description,
    deliveryTime: ad.deliveryTime,
    revisionCount: ad.revisionCount,
    price: ad.price,
    imageUrl: publicUrlFor(ad.imageKey),
    addons: {
      logo: Boolean(ad.addons?.logo),
      sourceCode: Boolean(ad.addons?.sourceCode),
      backgroundMusic: Boolean(ad.addons?.backgroundMusic),
    },
    extras: {
      fastDelivery: Boolean(ad.extras?.fastDelivery),
      fullHd: Boolean(ad.extras?.fullHd),
    },
    category: ad.category,
    subcategory: ad.subcategory,
    rating: ratingOf(ad.rating),
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
  };
}

export function toPortfolio(portfolio) {
  return {
    id: idOf(portfolio),
    ownerId: idOf(portfolio.owner),
    owner: toPublicUser(portfolio.owner),
    title: portfolio.title,
    description: portfolio.description,
    status: portfolio.status,
    price: portfolio.price,
    imageUrl: publicUrlFor(portfolio.imageKey),
    category: portfolio.category,
    subcategory: portfolio.subcategory,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
  };
}

export function toMessage(message) {
  return {
    id: idOf(message),
    senderId: idOf(message.sender),
    recipientId: idOf(message.recipient),
    text: message.text,
    sentAt: message.sentAt,
  };
}

export function toReview(review) {
  return {
    id: idOf(review),
    orderId: idOf(review.order),
    adId: idOf(review.ad),
    reviewer: toPublicUser(review.reviewer),
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
}

export function toOrder(order, { viewerRole, actions }) {
  return {
    id: idOf(order),
    adId: idOf(order.ad),
    adTitle: order.adTitle,
    buyer: toPublicUser(order.buyer),
    seller: toPublicUser(order.seller),
    status: order.status,
    viewerRole,
    availableActions: actions,
    requirements: order.requirements,
    offer:
      order.offer?.price != null
        ? {
            price: order.offer.price,
            deliveryDays: order.offer.deliveryDays,
            note: order.offer.note ?? "",
          }
        : null,
    dueAt: order.dueAt ?? null,
    revisionLimit: order.revisionLimit,
    revisionsUsed: order.revisionsUsed,
    deliveries: (order.deliveries ?? []).map((delivery) => ({
      id: idOf(delivery),
      note: delivery.note,
      deliveredAt: delivery.deliveredAt,
      files: delivery.files.map((file) => ({
        id: idOf(file),
        name: file.name,
        size: file.size,
        contentType: file.contentType,
      })),
    })),
    events: (order.events ?? []).map((event) => ({
      id: idOf(event),
      action: event.action,
      actorId: idOf(event.actor),
      fromStatus: event.fromStatus ?? null,
      toStatus: event.toStatus,
      note: event.note,
      at: event.at,
    })),
    reviewed: Boolean(order.reviewed),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}
