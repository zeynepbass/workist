import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import * as messageRepository from "../repositories/message.repository";

export function useMessages(gonderenId, aliciId) {
    const queryClient = useQueryClient();

    const messagesRepository =
        messageRepository.getMessages();

    const userRepository =
        messageRepository.getUser();

    const usersRepository =
        messageRepository.getUsers();

    const conversationsRepository =
        messageRepository.getConversations();

    const messageDataRepository =
        messageRepository.getMessageData();

    const messagesQuery = useQuery({
        queryKey: [
            "messages",
            gonderenId,
            aliciId,
        ],

        queryFn: () =>
            messagesRepository.getMessages(
                gonderenId,
                aliciId
            ),

        enabled: Boolean(
            gonderenId && aliciId
        ),
    });

    const userListQuery = useQuery({
        queryKey: ["user", gonderenId],

        queryFn: () =>
            userRepository.getUser(
                gonderenId
            ),

        enabled: Boolean(gonderenId),
    });

    const usersQuery = useQuery({
        queryKey: ["users"],

        queryFn: () =>
            usersRepository.getUsers(),
    });

    const conversationsQuery = useQuery({
        queryKey: [
            "conversations",
            gonderenId,
        ],

        queryFn: () =>
            conversationsRepository.getConversations(
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
        try {
            const response =
                await messageDataRepository.getMessageData(
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
        } catch (error) {
            console.error(
                "Mesaj silme hatası:",
                error
            );

            throw error;
        }
    };

    return {
        messages:
            messagesQuery.data ?? [],

        userList:
            userListQuery.data ?? [],

        users:
            usersQuery.data ?? [],

        konusmalar:
            conversationsQuery.data ?? [],

        isMessagesLoading:
            messagesQuery.isLoading,

        isUsersLoading:
            userListQuery.isLoading,

        isAllUsersLoading:
            usersQuery.isLoading,

        isConversationsLoading:
            conversationsQuery.isLoading,

        addMessageToCache,
        deleteMessages,
    };
}