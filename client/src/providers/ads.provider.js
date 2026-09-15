import * as adsApi from "../features/ads/api/ads.api";

export default function adsProvider() {
  return {
    getAllAds: adsApi.getAds,
    getDetailAds: adsApi.getAllDetail,
    deleteAds: adsApi.deleteAds,
    updateAds: adsApi.updateAds,
    createWorkPost:adsApi.createWorkPost
  };
}
