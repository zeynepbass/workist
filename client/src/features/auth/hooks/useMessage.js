import { useQuery } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";

export function useMessages() {
    const currentUser = JSON.parse(
        localStorage.getItem("login") || "null"
    );

    const userId = currentUser?.result?._id;

    const messagesRepository =
        authRepository.getMessages();

    const usersRepository =
        authRepository.getUsers();

    const messageDataRepository =
        authRepository.getMessageData();

    const {
        data: messagesResponse,
        isLoading: isMessagesLoading,
        isError: isMessagesError,
        error: messagesError,
    } = useQuery({
        queryKey: ["messages", userId],
        queryFn: () =>
            messagesRepository.getMessages(userId),
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
            usersRepository.getUsers(),
    });

    const getMessageData = (
        currentId,
        targetId
    ) => {
        return messageDataRepository.getMessageData(
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