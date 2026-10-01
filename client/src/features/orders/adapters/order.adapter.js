import { publicUserAdapter } from "@/features/auth/adapters/user.adapter";

export function orderAdapter(order) {
  return {
    id: order.id,
    adId: order.adId,
    adTitle: order.adTitle,
    buyer: publicUserAdapter(order.buyer),
    seller: publicUserAdapter(order.seller),
    status: order.status,
    viewerRole: order.viewerRole,
    availableActions: order.availableActions ?? [],
    requirements: order.requirements,
    offer: order.offer,
    dueAt: order.dueAt,
    revisionLimit: order.revisionLimit,
    revisionsUsed: order.revisionsUsed,
    deliveries: order.deliveries ?? [],
    events: order.events ?? [],
    reviewed: order.reviewed,
    createdAt: order.createdAt,
  };
}

export function reviewAdapter(review) {
  return {
    id: review.id,
    orderId: review.orderId,
    adId: review.adId,
    reviewer: publicUserAdapter(review.reviewer),
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
}
