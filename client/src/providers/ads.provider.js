import {adsApi} from "../features/ads/api/ads.api";

const adsProvider = {
    getAllAds: adsApi.getAds,
    getDetailAds: adsApi.getAllDetail,
    deletedAds: adsApi.deletedAds,
    updateAds: adsApi.updateAds,
    createWorkPost: adsApi.createWorkPost,
};

export default adsProvider;