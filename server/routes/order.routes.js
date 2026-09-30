import express from "express";

import * as orderController from "../controllers/order.controller.js";
import { uploadDeliveryFiles } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { idParams } from "../validators/common.js";
import {
  createOrderBody,
  deliverBody,
  listOrdersQuery,
  noteBody,
  offerBody,
  orderFileParams,
  reviewBody,
} from "../validators/order.validators.js";

const router = express.Router();

const action = (name, body = noteBody) =>
  router.post(
    `/:id/${name.replace("_", "-")}`,
    validate({ params: idParams, body }),
    orderController.transitionTo(name),
  );

router.get("/", validate({ query: listOrdersQuery }), orderController.listOrders);
router.post("/", validate({ body: createOrderBody }), orderController.createOrder);
router.get("/:id", validate({ params: idParams }), orderController.getOrder);

action("offer", offerBody);
action("accept");
action("request_revision");
action("complete");
action("cancel");

router.post(
  "/:id/deliver",
  uploadDeliveryFiles,
  validate({ params: idParams, body: deliverBody }),
  orderController.transitionTo("deliver"),
);

router.get(
  "/:id/files/:fileId",
  validate({ params: orderFileParams }),
  orderController.downloadOrderFile,
);

router.post(
  "/:id/review",
  validate({ params: idParams, body: reviewBody }),
  orderController.reviewOrder,
);

export default router;
