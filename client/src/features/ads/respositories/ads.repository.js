import { adsAdapter } from "../adapters/ads.adapters"
import adsProvider from "@/providers/ads.provider"
export function getAds(){
    return{
        async getAds(){
            const response=await adsProvider.getAllAds()
            return response.map(adsAdapter)
        }
    }
}
export function getDetailAds(){
    return{
        async getAds(){
            const response=await adsProvider.getDetailAds()
            return response.map(adsAdapter)
        }
    }
}
export function deletedAds(){
    return{
        async deleteAds(){
            const response=await adsProvider.deleteAds()
            return response.map(adsAdapter)
        }
    }
}
export function updateAds(){
    return{
        async updateAds(){
            const response=await adsProvider.updateAds()
            return response.map(adsAdapter)
        }
    }
}