import adsAdapter from "../adapters/ads.adapters";
import adsProvider from "@/providers/ads.provider";

export function getAds() {
    return {
        async getAds(userId) {
            const response =
                await adsProvider.getAllAds(userId);

            return response.map(adsAdapter);
        },
    };
}

export function getDetailAds() {
    return {
        async getDetailAds(id) {
            const response =
                await adsProvider.getDetailAds(id);

            return adsAdapter(response);
        },
    };
}

export function deletedAds() {
    return {
        async deleteAds(id) {
            return await adsProvider.deleteAds(id);
        },
    };
}

export function updateAds() {
    return {
        async updateAds(id, post) {
            const response =
                await adsProvider.updateAds(id, post);

            return adsAdapter(response);
        },
    };
}

export function createWorkPost() {
    return {
        async createWorkPost(post) {
            const response =
                await adsProvider.createWorkPost(post);

            return adsAdapter(response);
        },
    };
}