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
export async function deletedAds(id){
    const response = await apiClient.delete(
        `/ilanlarim/${id}`
    );

    return response.data;
}
export async function updateAds(id,post){
    const response = await apiClient.put(
        `/ilanlarim/${id}`,
              post
    );

    return response.data;
}
export async function createWorkPost(post) {
    const response = await apiClient.post(
        "/ilanlarim",
        post
    );

    return response.data;
}