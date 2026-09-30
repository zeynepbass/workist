import { toFormData } from "@/shared/api";
import { toPage } from "@/shared/api/pagination";
import adAdapter from "../adapters/ad.adapter";
import { adsApi } from "../api/ads.api";

const compact = (params) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ""));

export async function listAds(filters, cursor) {
  return toPage(await adsApi.list(compact({ ...filters, cursor })), adAdapter);
}

export async function getAd(id) {
  const { data } = await adsApi.get(id);
  return adAdapter(data.data);
}

export async function createAd({ fields, image }) {
  const { data } = await adsApi.create(toFormData(fields, { image }));
  return adAdapter(data.data);
}

export async function updateAd(id, { fields, image }) {
  const { data } = await adsApi.update(id, toFormData(fields, { image }));
  return adAdapter(data.data);
}

export async function deleteAd(id) {
  await adsApi.remove(id);
}
