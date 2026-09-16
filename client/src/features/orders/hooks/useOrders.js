import { useQuery } from "@tanstack/react-query";
import * as ordersRepository from "../repositories/orders.repository";

export function useOrders(userId) {
    const userPostsRepository =
        ordersRepository.getUserPosts(userId);

    const postsRepository =
        ordersRepository.getPosts();

    const userPostsQuery = useQuery({
        queryKey: ["orders", "user", userId],

        queryFn: () =>
            userPostsRepository.getUserPosts(userId),

        enabled: !!userId,
    });

    const postsQuery = useQuery({
        queryKey: ["orders"],

        queryFn: () =>
            postsRepository.getPosts(),
    });

    return {
        userPosts: userPostsQuery.data ?? [],
        posts: postsQuery.data ?? [],

        isUserPostsLoading:
            userPostsQuery.isLoading,

        isPostsLoading:
            postsQuery.isLoading,

        isUserPostsError:
            userPostsQuery.isError,

        isPostsError:
            postsQuery.isError,

        userPostsError:
            userPostsQuery.error,

        postsError:
            postsQuery.error,
    };
}