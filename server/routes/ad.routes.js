import express from "express";

import * as adController from "../controllers/ad.controller.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { createAdBody, listAdsQuery, updateAdBody } from "../validators/ad.validators.js";
import { idParams } from "../validators/common.js";

const router = express.Router();

router.get("/", validate({ query: listAdsQuery }), adController.listAds);
router.post("/", uploadImage("image"), validate({ body: createAdBody }), adController.createAd);
router.get("/:id", validate({ params: idParams }), adController.getAd);
router.patch(
  "/:id",
  uploadImage("image"),
  validate({ params: idParams, body: updateAdBody }),
  adController.updateAd,
);
router.delete("/:id", validate({ params: idParams }), adController.deleteAd);

export default router;
