import Ad from "../models/ad.model.js";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { AppError, forbidden, notFound } from "../utils/AppError.js";
import { cursorFilter, paginate } from "../utils/pagination.js";
import { roleOf } from "./orderStateMachine.js";

const REVIEWER_FIELDS = "firstName lastName title avatarKey rating";

async function refreshRating(Model, id, match) {
  const [summary] = await Review.aggregate([
    { $match: match },
    { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  await Model.updateOne(
    { _id: id },
    { $set: { rating: { average: summary?.average ?? 0, count: summary?.count ?? 0 } } },
  );
}

export async function createReview(orderId, userId, { rating, comment }) {
  const order = await Order.findById(orderId);

  if (!order || !roleOf(order, userId)) {
    throw notFound("Sipariş bulunamadı.");
  }

  if (roleOf(order, userId) !== "buyer") {
    throw forbidden("Değerlendirmeyi yalnızca alıcı yapabilir.");
  }

  if (order.status !== "completed") {
    throw new AppError(409, "ORDER_NOT_COMPLETED", "Yalnızca tamamlanan siparişler değerlendirilebilir.");
  }

  const claimed = await Order.updateOne({ _id: order._id, reviewed: false }, { $set: { reviewed: true } });

  if (claimed.modifiedCount === 0) {
    throw new AppError(409, "ALREADY_REVIEWED", "Bu sipariş zaten değerlendirildi.");
  }

  const review = await Review.create({
    order: order._id,
    ad: order.ad,
    reviewer: userId,
    seller: order.seller,
    rating,
    comment,
  });

  await Promise.all([
    refreshRating(Ad, order.ad, { ad: order.ad }),
    refreshRating(User, order.seller, { seller: order.seller }),
  ]);

  return review.populate("reviewer", REVIEWER_FIELDS);
}

export async function listReviews({ sellerId, adId, cursor, limit }) {
  const filter = {
    $and: [sellerId ? { seller: sellerId } : {}, adId ? { ad: adId } : {}, cursorFilter(cursor)],
  };

  return paginate(Review.find(filter).populate("reviewer", REVIEWER_FIELDS), { limit });
}
