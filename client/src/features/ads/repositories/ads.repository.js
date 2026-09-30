import { adsApi } from "../api/ads.api";
import adAdapter from "../adapters/ad.adapter";

export async function searchAds({ search, subcategory } = {}) {
  const params = {};

  if (search) params.search = search;
  if (subcategory) params.subcategory = subcategory;

  const response = await adsApi.searchAds(params);

  return response.data.map(adAdapter);
}

export async function getMyAds() {
  const response = await adsApi.getMyAds();

  return response.data.map(adAdapter);
}

export async function getAd(id) {
  const response = await adsApi.getAd(id);

  return adAdapter(response.data);
}

export async function deleteAd(id) {
  const response = await adsApi.deleteAd(id);

  return response.data;
}

export async function updateAd(id, ad) {
  const response = await adsApi.updateAd(id, ad);

  return adAdapter(response.data);
}

export async function createAd(ad) {
  const response = await adsApi.createAd(ad);

  return adAdapter(response.data);
}
