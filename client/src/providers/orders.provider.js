import * as ordersApi from "../features/orders/api/orders.api";

export default function adsProvider() {
  return {
    getUserPosts: ordersApi.getUserPosts,
    getPosts: ordersApi.getPosts,
  };
}
