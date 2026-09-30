import express from "express";

import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { loginBody, registerBody } from "../validators/auth.validators.js";

export function createAuthRouter({ limiters }) {
  const router = express.Router();

  router.post(
    "/register",
    limiters.credentials,
    validate({ body: registerBody }),
    authController.register,
  );
  router.post("/login", limiters.credentials, validate({ body: loginBody }), authController.login);
  router.post("/refresh", limiters.refresh, authController.refresh);
  router.post("/logout", authController.logout);

  return router;
}
