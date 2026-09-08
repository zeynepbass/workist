import * as adsApi from "../features/ads/api/ads.api"

const adsProvider={
    getAllAds:adsApi.getAds,
    getDetailAds:adsApi.getAllDetail,
    deleteAds:adsApi.deleteAds,
    updateAds:adsApi.updateAds
}
export default adsProvider