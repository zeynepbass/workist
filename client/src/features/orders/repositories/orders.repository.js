import { ordersApi } from "../api/orders.api";
import ordersAdapter from "../adapters/orders.adapter";

export async function getUserPosts(userId) {
    const response = await ordersApi.getUserPosts(userId);

    return response.data.map(ordersAdapter);
}

export async function getPosts() {
    const response = await ordersApi.getPosts();

    return response.data.map(ordersAdapter);
}
