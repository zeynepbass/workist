import express from "express";

import authenticate from "../middleware/authenticate.js";
import {
  deleteUserByEmail,
  getMe,
  getUserByEmail,
  listOtherUsers,
  listUsers,
  signIn,
  signUp,
  updateUserByEmail,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.get("/users", listUsers);
router.get("/users/:id", listOtherUsers);
router.delete("/users/:email", deleteUserByEmail);
router.post("/signin", signIn);
router.post("/uye-ol", signUp);
router.get("/duzenle/:email", getUserByEmail);
router.put("/duzenle/:email", updateUserByEmail);

export default router;
