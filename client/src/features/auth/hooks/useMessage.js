
import { useQuery } from "@tanstack/react-query";
import * as authRepository from "../repositories/auth.repository";
export function useMessages  ()  {
  const userid = JSON.parse(localStorage.getItem("login"));
  const userId = userid?.result?._id;


  const {
    data: messagesResponse,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => authRepository.getMessages(userId),
    enabled: !!userId,
  });


  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => authRepository.getUsers(),
  });


  const getMessageData = (currentId, targetId) => {
    return authRepository.getMessageData(currentId, targetId);
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

