import express from "express";

import * as portfolioController from "../controllers/portfolio.controller.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { idParams } from "../validators/common.js";
import {
  createPortfolioBody,
  listPortfoliosQuery,
  updatePortfolioBody,
} from "../validators/portfolio.validators.js";

const router = express.Router();

router.get("/", validate({ query: listPortfoliosQuery }), portfolioController.listPortfolios);
router.post(
  "/",
  uploadImage("image"),
  validate({ body: createPortfolioBody }),
  portfolioController.createPortfolio,
);
router.get("/:id", validate({ params: idParams }), portfolioController.getPortfolio);
router.patch(
  "/:id",
  uploadImage("image"),
  validate({ params: idParams, body: updatePortfolioBody }),
  portfolioController.updatePortfolio,
);
router.delete("/:id", validate({ params: idParams }), portfolioController.deletePortfolio);

export default router;
