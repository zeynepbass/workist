import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getMessages,
    getUser,
    getUsers,
    getConversations,
    getMessageData,
} from "../repositories/message.repository";

export function useMessages(gonderenId, aliciId) {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({
        queryKey: ["messages", gonderenId, aliciId],
        queryFn: () => getMessages(gonderenId, aliciId),
        enabled: Boolean(gonderenId && aliciId),
    });

    const userListQuery = useQuery({
        queryKey: ["user", gonderenId],
        queryFn: () => getUser(gonderenId),
        enabled: Boolean(gonderenId),
    });

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const conversationsQuery = useQuery({
        queryKey: ["conversations", gonderenId],
        queryFn: () => getConversations(gonderenId),
        enabled: Boolean(gonderenId),
    });

    const addMessageToCache = (message) => {
        queryClient.setQueryData(
            ["messages", gonderenId, aliciId],
            (oldMessages = []) => [
                ...oldMessages,
                message,
            ]
        );
    };

    const deleteMessages = async (currentId, targetId) => {
        try {
            const response = await getMessageData(
                currentId,
                targetId
            );

            queryClient.setQueryData(
                ["messages", currentId, targetId],
                []
            );

            await queryClient.invalidateQueries({
                queryKey: ["conversations", currentId],
            });

            return response;
        } catch (error) {
            console.error("Mesaj silme hatası:", error);
            throw error;
        }
    };

    return {
        messages: messagesQuery.data ?? [],
        userList: userListQuery.data ?? [],
        users: usersQuery.data ?? [],
        konusmalar: conversationsQuery.data ?? [],

        isMessagesLoading: messagesQuery.isLoading,
        isUsersLoading: userListQuery.isLoading,
        isAllUsersLoading: usersQuery.isLoading,
        isConversationsLoading:
            conversationsQuery.isLoading,

        addMessageToCache,
        deleteMessages,
    };
}