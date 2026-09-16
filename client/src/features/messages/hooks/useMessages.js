import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import * as messageRepository from "../repositories/message.repository";

export function useMessages(gonderenId, aliciId) {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({
        queryKey: [
            "messages",
            gonderenId,
            aliciId,
        ],

        queryFn: () =>
            messageRepository.getMessages(
                gonderenId,
                aliciId
            ),

        enabled: Boolean(
            gonderenId && aliciId
        ),
    });

    const usersQuery = useQuery({
        queryKey: ["users"],

        queryFn: () =>
            messageRepository.getUsers(),
    });

    const conversationsQuery = useQuery({
        queryKey: [
            "conversations",
            gonderenId,
        ],

        queryFn: () =>
            messageRepository.getConversations(
                gonderenId
            ),

        enabled: Boolean(gonderenId),
    });

    const addMessageToCache = (message) => {
        queryClient.setQueryData(
            [
                "messages",
                gonderenId,
                aliciId,
            ],
            (oldMessages = []) => [
                ...oldMessages,
                message,
            ]
        );
    };

    const deleteMessages = async (
        currentId,
        targetId
    ) => {
        const response =
            await messageRepository.getMessageData(
                currentId,
                targetId
            );

        queryClient.setQueryData(
            [
                "messages",
                currentId,
                targetId,
            ],
            []
        );

        await queryClient.invalidateQueries({
            queryKey: [
                "conversations",
                currentId,
            ],
        });

        return response;
    };

    return {
        messages:
            messagesQuery.data ?? [],

        userList:
            usersQuery.data ?? [],

        users:
            usersQuery.data ?? [],

        konusmalar:
            conversationsQuery.data ?? [],

        isMessagesLoading:
            messagesQuery.isLoading,

        isUsersLoading:
            usersQuery.isLoading,

        isAllUsersLoading:
            usersQuery.isLoading,

        isConversationsLoading:
            conversationsQuery.isLoading,

        addMessageToCache,
        deleteMessages,
    };
}