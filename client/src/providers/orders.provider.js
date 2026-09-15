import * as ordersApi from "../features/orders/api/orders.api";

const ordersProvider = {
    getUserPosts: ordersApi.getUserPosts,
    getPosts: ordersApi.getPosts,
};

export default ordersProvider;