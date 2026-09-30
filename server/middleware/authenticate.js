import jwt from "jsonwebtoken";

import env from "../config/env.js";

export default function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Yetkilendirme tokenı bulunamadı." });
  }

  try {
    req.user = jwt.verify(authHeader.split(" ")[1], env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
}
