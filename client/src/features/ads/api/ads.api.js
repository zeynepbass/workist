import apiClient from "@/shared/api";

export async function getAds(userId) {
    const response = await apiClient.get(
        `/ilanlarim/${userId}`
    );

    return response.data;
}

export async function getAllDetail(id) {
    const response = await apiClient.get(
        `/ilanlarim/${id}`
    );

    return response.data;
}
export async function deleteAds(id){
    const response = await apiClient.delete(
        `/ilanlarim/${id}`
    );

    return response.data;
}
export async function updateAds(id,post){
    const response = await apiClient.put(
        `${baseUrl}/ilanlarim/${id}`,
              post
    );

    return response.data;
}
