import express from "express";

import authenticate from "../middleware/authenticate.js";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  listMyPortfolios,
  updatePortfolio,
  updatePortfolioStatus,
} from "../controllers/portfolio.controller.js";

const router = express.Router();

router.get("/portfolyo", authenticate, listMyPortfolios);
router.post("/portfolyo", authenticate, createPortfolio);
router.delete("/portfolyo/:id", deletePortfolio);
router.get("/portfolyo/:id", getPortfolio);
router.put("/portfolyo/:id", updatePortfolio);
router.patch("/portfolyo/:id", updatePortfolioStatus);

export default router;
