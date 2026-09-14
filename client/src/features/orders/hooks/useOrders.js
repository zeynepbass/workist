import {
    getUserPosts,
    getPosts
} from "../repositories/orders.repository";

import { useQuery } from "@tanstack/react-query";

export function useOrders(userId) {

    const userPostsQuery = useQuery({
        queryKey: ["orders", "user", userId],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId,
    });

    const postsQuery = useQuery({
        queryKey: ["orders"],
        queryFn: getPosts,
    });

    return {
        userPosts: userPostsQuery.data,
        posts: postsQuery.data,

        isUserPostsLoading: userPostsQuery.isLoading,
        isPostsLoading: postsQuery.isLoading,

        isUserPostsError: userPostsQuery.isError,
        isPostsError: postsQuery.isError,

        userPostsError: userPostsQuery.error,
        postsError: postsQuery.error,
    };
}