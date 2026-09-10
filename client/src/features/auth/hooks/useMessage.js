
import { useQuery } from "@tanstack/react-query";
import messageRepository from "../repositories/authRepository";

export const useMessages = () => {
  const userid = JSON.parse(localStorage.getItem("login"));
  const userId = userid?.result?._id;


  const {
    data: messagesResponse,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => messageRepository.getMessages(userId),
    enabled: !!userId,
  });


  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => messageRepository.getUsers(),
  });


  const getMessageData = (currentId, targetId) => {
    return messageRepository.getMessageData(currentId, targetId);
  };

  return {
    konusmalar: messagesResponse?.data || [],
    users: usersResponse?.data || [],

    getMessageData,

    isMessagesLoading,
    isMessagesError,
    messagesError,

    isUsersLoading,
    isUsersError,
    usersError,
  };
};

