import express from "express";
import mongoose from "mongoose";

import { CATEGORIES } from "../constants/categories.js";

const router = express.Router();

router.get("/health", (req, res) => {
  const database = mongoose.connection.readyState === 1 ? "up" : "down";
  res
    .status(database === "up" ? 200 : 503)
    .json({ status: database === "up" ? "ok" : "degraded", database });
});

router.get("/api/categories", (req, res) => {
  res.set("Cache-Control", "public, max-age=3600");
  res.json({ data: CATEGORIES });
});

export default router;
