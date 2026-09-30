import { randomUUID } from "node:crypto";

import { fileTypeFromBuffer } from "file-type";

import { unsupportedMediaType } from "../utils/AppError.js";

export const IMAGE_POLICY = Object.freeze({
  maxBytes: 5 * 1024 * 1024,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
});

export const DELIVERY_POLICY = Object.freeze({
  maxBytes: 20 * 1024 * 1024,
  maxFiles: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf", "application/zip"],
});

export async function detectAllowedType(buffer, allowedTypes) {
  const detected = await fileTypeFromBuffer(buffer);

  if (!detected || !allowedTypes.includes(detected.mime)) {
    throw unsupportedMediaType("Bu dosya türü desteklenmiyor.");
  }

  return detected;
}

export function buildStorageKey({ visibility, folder, ownerId, extension }) {
  return `${visibility}/${folder}/${ownerId}/${randomUUID()}.${extension}`;
}

export function sanitizeFileName(name) {
  const base = String(name ?? "dosya")
    .split(/[\\/]/)
    .pop()
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .replace(/^\.+/, "")
    .trim()
    .slice(0, 100);

  return base || "dosya";
}
