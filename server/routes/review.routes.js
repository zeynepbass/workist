import express from "express";

import * as orderController from "../controllers/order.controller.js";
import { validate } from "../middleware/validate.js";
import { listReviewsQuery } from "../validators/order.validators.js";

const router = express.Router();

router.get("/", validate({ query: listReviewsQuery }), orderController.listReviews);

export default router;
