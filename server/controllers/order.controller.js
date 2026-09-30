import { toOrder, toReview } from "../serializers/index.js";
import * as orderService from "../services/order.service.js";
import * as reviewService from "../services/review.service.js";
import { validationFailed } from "../utils/AppError.js";

const present = (order, userId) => {
  const { viewerRole, actions } = orderService.describeFor(order, userId);
  return toOrder(order, { viewerRole, actions });
};

export async function createOrder(req, res) {
  const order = await orderService.createOrder(req.user.id, req.validated.body);
  res.status(201).json({ data: present(order, req.user.id) });
}

export async function listOrders(req, res) {
  const { items, nextCursor } = await orderService.listOrders(req.user.id, req.validated.query);
  res.json({ data: items.map((order) => present(order, req.user.id)), meta: { nextCursor } });
}

export async function getOrder(req, res) {
  const order = await orderService.getOrder(req.validated.params.id, req.user.id);
  res.json({ data: present(order, req.user.id) });
}

export const transitionTo = (action) =>
  async function applyOrderAction(req, res) {
    const files = req.files ?? [];

    if (action === "deliver" && files.length === 0 && !req.validated.body.note) {
      throw validationFailed([{ path: "files", message: "Teslimat için not veya dosya ekleyin." }]);
    }

    const order = await orderService.transition(
      req.validated.params.id,
      req.user.id,
      action,
      req.validated.body,
      { files },
    );

    res.json({ data: present(order, req.user.id) });
  };

export async function downloadOrderFile(req, res) {
  const { file, download } = await orderService.getOrderFileDownload(
    req.validated.params.id,
    req.validated.params.fileId,
    req.user.id,
  );

  if (download.redirectUrl) {
    return res.redirect(302, download.redirectUrl);
  }

  res.attachment(file.name);
  res.type(file.contentType);
  return download.stream.pipe(res);
}

export async function reviewOrder(req, res) {
  const review = await reviewService.createReview(
    req.validated.params.id,
    req.user.id,
    req.validated.body,
  );
  res.status(201).json({ data: toReview(review) });
}

export async function listReviews(req, res) {
  const { items, nextCursor } = await reviewService.listReviews(req.validated.query);
  res.json({ data: items.map(toReview), meta: { nextCursor } });
}
