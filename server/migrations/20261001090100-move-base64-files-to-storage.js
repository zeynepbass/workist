import logger from "../config/logger.js";
import storage from "../storage/index.js";
import { IMAGE_POLICY, buildStorageKey, detectAllowedType } from "../storage/uploadPolicy.js";

const TARGETS = [
  { collection: "ads", field: "imageKey", folder: "ads", ownerField: "owner" },
  { collection: "portfolios", field: "imageKey", folder: "portfolios", ownerField: "owner" },
  { collection: "users", field: "avatarKey", folder: "avatars", ownerField: "_id" },
];

const DATA_URI = /^data:[^;]+;base64,/;

export async function moveDocumentFile(document, { field, folder, ownerField }) {
  const buffer = Buffer.from(document[field].replace(DATA_URI, ""), "base64");
  const detected = await detectAllowedType(buffer, IMAGE_POLICY.allowedTypes);
  const key = buildStorageKey({
    visibility: "public",
    folder,
    ownerId: String(document[ownerField]),
    extension: detected.ext,
  });

  await storage.save({ key, body: buffer, contentType: detected.mime });
  return key;
}

export const up = async (db) => {
  for (const target of TARGETS) {
    const collection = db.collection(target.collection);
    const cursor = collection.find({ [target.field]: { $regex: "^data:" } });
    let moved = 0;
    let skipped = 0;

    for await (const document of cursor) {
      try {
        const key = await moveDocumentFile(document, target);
        await collection.updateOne({ _id: document._id }, { $set: { [target.field]: key } });
        moved += 1;
      } catch (error) {
        skipped += 1;
        logger.warn(
          { collection: target.collection, id: String(document._id), reason: error.message },
          "Skipped file during migration",
        );
      }
    }

    logger.info({ collection: target.collection, moved, skipped }, "Base64 files migrated");
  }
};

export const down = async () => {
  logger.warn("Moving files back into MongoDB as base64 is not supported; nothing was changed");
};
