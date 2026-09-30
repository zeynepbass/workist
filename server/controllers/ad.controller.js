import { toAd } from "../serializers/index.js";
import * as adService from "../services/ad.service.js";

export async function listAds(req, res) {
  const { items, nextCursor } = await adService.listAds(req.validated.query, req.user.id);
  res.json({ data: items.map(toAd), meta: { nextCursor } });
}

export async function getAd(req, res) {
  res.json({ data: toAd(await adService.getAd(req.validated.params.id)) });
}

export async function createAd(req, res) {
  const ad = await adService.createAd(req.user.id, req.validated.body, req.file);
  res.status(201).json({ data: toAd(ad) });
}

export async function updateAd(req, res) {
  const ad = await adService.updateAd(
    req.validated.params.id,
    req.user.id,
    req.validated.body,
    req.file,
    { log: req.log },
  );
  res.json({ data: toAd(ad) });
}

export async function deleteAd(req, res) {
  await adService.deleteAd(req.validated.params.id, req.user.id, { log: req.log });
  res.status(204).end();
}
