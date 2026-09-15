import ordersAdapter from "../adapters/orders.adapter"
import ordersProvider from "@/providers/orders.provider"
export function getUserPosts(){
    return{
        async getUserPosts(userId){
            const response=await ordersProvider.getUserPosts(userId)
            return response.map(ordersAdapter)
        }
    }
}
export function getPosts(){
    return{
        async getPosts(){
            const response=await ordersProvider.getPosts()
            return response.map(ordersAdapter)
        }
    }
}