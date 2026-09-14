import * as ordersApi from "../features/orders/api/orders.api"

const adsProvider={
    getUserPosts:ordersApi.getUserPosts,
    getPosts:ordersApi.getPosts,
}
export default adsProvider