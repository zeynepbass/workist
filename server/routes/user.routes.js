import express from "express";

import * as userController from "../controllers/user.controller.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { idParams } from "../validators/common.js";
import {
  changePasswordBody,
  deleteAccountBody,
  updateProfileBody,
} from "../validators/user.validators.js";

const router = express.Router();

router.get("/me", userController.getMe);
router.patch("/me", validate({ body: updateProfileBody }), userController.updateMe);
router.put("/me/avatar", uploadImage("avatar"), userController.updateMyAvatar);
router.patch("/me/password", validate({ body: changePasswordBody }), userController.changeMyPassword);
router.delete("/me", validate({ body: deleteAccountBody }), userController.deleteMe);
router.get("/:id", validate({ params: idParams }), userController.getUser);

export default router;
