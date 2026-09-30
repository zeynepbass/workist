import storage from "../storage/index.js";
import {
  DELIVERY_POLICY,
  IMAGE_POLICY,
  buildStorageKey,
  detectAllowedType,
  sanitizeFileName,
} from "../storage/uploadPolicy.js";

export async function storeImage(file, { folder, ownerId }) {
  const detected = await detectAllowedType(file.buffer, IMAGE_POLICY.allowedTypes);
  const key = buildStorageKey({
    visibility: "public",
    folder,
    ownerId,
    extension: detected.ext,
  });

  await storage.save({ key, body: file.buffer, contentType: detected.mime });

  return key;
}

export async function storeDeliveryFiles(files, { orderId }) {
  const stored = [];

  for (const file of files) {
    const detected = await detectAllowedType(file.buffer, DELIVERY_POLICY.allowedTypes);
    const key = buildStorageKey({
      visibility: "private",
      folder: "orders",
      ownerId: orderId,
      extension: detected.ext,
    });

    await storage.save({ key, body: file.buffer, contentType: detected.mime });
    stored.push({
      key,
      name: sanitizeFileName(file.originalname),
      size: file.size,
      contentType: detected.mime,
    });
  }

  return stored;
}
