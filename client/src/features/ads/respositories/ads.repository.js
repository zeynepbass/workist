
import adsAdapter from "../adapters/ads.adapters";
import adsProvider from "@/providers/ads.provider";

export async function getAds(userId) {
    const response = await adsProvider.getAllAds(userId);

    return response.map(adsAdapter);
}

export async function getDetailAds(id) {
    const response = await adsProvider.getDetailAds(id);

    return adsAdapter(response);
}

export async function deleteAds(id) {
    return await adsProvider.deleteAds(id);
}

export async function updateAds(id, post) {
    const response = await adsProvider.updateAds(id, post);

    return adsAdapter(response);
}

export async function createWorkPost(post) {
    const response = await adsProvider.createWorkPost(post);

    return adsAdapter(response);
}

