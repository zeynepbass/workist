import express from "express";

import { CATEGORIES } from "../constants/categories.js";

const router = express.Router();

router.get("/api/categories", (req, res) => {
  res.set("Cache-Control", "public, max-age=3600");
  res.json(CATEGORIES);
});

export default router;
