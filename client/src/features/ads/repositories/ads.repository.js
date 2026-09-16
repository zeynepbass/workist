import { adsApi } from "../api/ads.api";
import adsAdapter from "../adapters/ads.adapters";

export async function getAds() {
    const response = await adsApi.getAds();

    return response.data.map(adsAdapter);
}

export async function getDetailAds(id) {
    const response = await adsApi.getAllDetail(id);

    return adsAdapter(response.data);
}

export async function deletedAds(id) {
    const response = await adsApi.deletedAds(id);

    return response.data;
}

export async function updateAds(id, post) {
    const response = await adsApi.updateAds(id, post);

    return adsAdapter(response.data);
}

export async function createWorkPost(post) {
    const response = await adsApi.createWorkPost(post);

    return adsAdapter(response.data);
}
