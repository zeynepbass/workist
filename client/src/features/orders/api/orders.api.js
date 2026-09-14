import apiClient from "@/shared/api";
export async function getUserPosts(userId) {
    const response = await apiClient.get(
 `/ilanlarim/${userId}`
    );

    return response.data;
}

export async function getPosts() {
    const response = await apiClient.get(
  `/ilanlar`
    );

    return response.data;
}