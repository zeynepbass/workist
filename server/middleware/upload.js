import multer from "multer";

import { DELIVERY_POLICY, IMAGE_POLICY } from "../storage/uploadPolicy.js";

const memory = multer.memoryStorage();

export const uploadImage = (fieldName) =>
  multer({ storage: memory, limits: { fileSize: IMAGE_POLICY.maxBytes, files: 1 } }).single(
    fieldName,
  );

export const uploadDeliveryFiles = multer({
  storage: memory,
  limits: { fileSize: DELIVERY_POLICY.maxBytes, files: DELIVERY_POLICY.maxFiles },
}).array("files", DELIVERY_POLICY.maxFiles);
