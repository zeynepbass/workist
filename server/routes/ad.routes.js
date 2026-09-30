import express from "express";

import authenticate from "../middleware/authenticate.js";
import {
  createAd,
  deleteAd,
  getAd,
  listAds,
  listMyAds,
  updateAd,
} from "../controllers/ad.controller.js";

const router = express.Router();

router.get("/ilanlar", listAds);
router.get("/ilanlarim", authenticate, listMyAds);
router.post("/ilanlarim", createAd);
router.delete("/ilanlarim/:id", deleteAd);
router.get("/ilanlarim/:id", getAd);
router.put("/ilanlarim/:id", updateAd);

export default router;
