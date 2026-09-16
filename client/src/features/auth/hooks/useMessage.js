import { useQuery } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useMessages() {
    const currentUser = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const userId =
        currentUser?._id ||
        currentUser?.result?._id;

    console.log("CURRENT USER:", currentUser);
    console.log("USER ID:", userId);

    const {
        data: messagesResponse,
        isLoading: isMessagesLoading,
        isError: isMessagesError,
        error: messagesError,
    } = useQuery({
        queryKey: ["messages", userId],

        queryFn: () =>
            authRepository.getMessages(userId),

        enabled: !!userId,
    });

    const {
        data: usersResponse,
        isLoading: isUsersLoading,
        isError: isUsersError,
        error: usersError,
    } = useQuery({
        queryKey: ["users"],

        queryFn: () =>
            authRepository.getUsers(),
    });

    const getMessageData = (
        currentId,
        targetId
    ) => {
        return authRepository.getMessageData(
            currentId,
            targetId
        );
    };

    return {
        konusmalar: messagesResponse || [],
        users: usersResponse || [],

        getMessageData,

        isMessagesLoading,
        isMessagesError,
        messagesError,

        isUsersLoading,
        isUsersError,
        usersError,
    };
}