
import ordersAdapter from "../adapters/orders.adapter";
import ordersProvider from "@/providers/orders.provider";

export async function getUserPosts(userId) {
    const response = await ordersProvider.getUserPosts(userId);

    return response.data;
}

export async function getPosts() {
    const response = await ordersProvider.getPosts();

    return response.map;
}

