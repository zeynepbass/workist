import env from "../config/env.js";
import { createLocalStorage } from "./localStorage.js";
import { createS3Storage } from "./s3Storage.js";

const ABSOLUTE_URL = /^https?:\/\//;

function createStorage() {
  if (env.STORAGE_DRIVER === "s3") {
    return createS3Storage({
      endpoint: env.S3_ENDPOINT,
      region: env.S3_REGION,
      bucket: env.S3_BUCKET,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      publicUrl: env.S3_PUBLIC_URL,
      forcePathStyle: env.S3_FORCE_PATH_STYLE,
    });
  }

  return createLocalStorage({ rootDir: env.UPLOAD_DIR });
}

const storage = createStorage();

export function publicUrlFor(key) {
  if (!key) {
    return null;
  }

  return ABSOLUTE_URL.test(key) ? key : storage.publicUrl(key);
}

export async function removeQuietly(key, log) {
  if (!key || ABSOLUTE_URL.test(key)) {
    return;
  }

  try {
    await storage.remove(key);
  } catch (error) {
    log?.warn({ err: error, key }, "Failed to remove stored file");
  }
}

export default storage;
