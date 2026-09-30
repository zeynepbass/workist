import Ad from "../models/ad.model.js";
import { findSubcategorySlugsByLabel } from "../constants/categories.js";
import { removeQuietly } from "../storage/index.js";
import { notFound, validationFailed } from "../utils/AppError.js";
import { escapeRegex } from "../utils/escapeRegex.js";
import { cursorFilter, paginate } from "../utils/pagination.js";
import { storeImage } from "./file.service.js";
import { findOwnedOrThrow } from "./ownership.js";

const OWNER_FIELDS = "firstName lastName title avatarKey rating";

function searchFilter(search) {
  if (!search) {
    return {};
  }

  const pattern = new RegExp(escapeRegex(search), "i");

  return {
    $or: [
      { title: pattern },
      { serviceType: pattern },
      { subcategory: { $in: findSubcategorySlugsByLabel(search) } },
    ],
  };
}

export async function listAds(query, viewerId) {
  const direction = query.sort === "oldest" ? 1 : -1;
  const owner = query.owner === "me" ? viewerId : query.owner;

  const filter = {
    $and: [
      searchFilter(query.search),
      query.category ? { category: query.category } : {},
      query.subcategory ? { subcategory: query.subcategory } : {},
      owner ? { owner } : {},
      cursorFilter(query.cursor, { direction }),
    ],
  };

  return paginate(Ad.find(filter).populate("owner", OWNER_FIELDS), {
    limit: query.limit,
    direction,
  });
}

export async function getAd(id) {
  const ad = await Ad.findById(id).populate("owner", OWNER_FIELDS);

  if (!ad) {
    throw notFound("İlan bulunamadı.");
  }

  return ad;
}

export async function createAd(ownerId, fields, file) {
  if (!file) {
    throw validationFailed([{ path: "image", message: "İlan görseli zorunludur." }]);
  }

  const imageKey = await storeImage(file, { folder: "ads", ownerId });
  const ad = await Ad.create({ ...fields, owner: ownerId, imageKey });

  return ad.populate("owner", OWNER_FIELDS);
}

export async function updateAd(id, ownerId, changes, file, { log } = {}) {
  const ad = await findOwnedOrThrow(Ad, id, ownerId, { notFoundMessage: "İlan bulunamadı." });
  const previousKey = ad.imageKey;

  ad.set(changes);

  if (file) {
    ad.imageKey = await storeImage(file, { folder: "ads", ownerId });
  }

  await ad.save();

  if (file) {
    await removeQuietly(previousKey, log);
  }

  return ad.populate("owner", OWNER_FIELDS);
}

export async function deleteAd(id, ownerId, { log } = {}) {
  const ad = await findOwnedOrThrow(Ad, id, ownerId, { notFoundMessage: "İlan bulunamadı." });
  await ad.deleteOne();
  await removeQuietly(ad.imageKey, log);
}
