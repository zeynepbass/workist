import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useSocket } from "@/shared/socket/SocketProvider";
import { useMessages, useSendMessage } from "../../hooks/useMessages";
import ChatInput from "../ChatInput";
import ChatMessageList from "../ChatMessageList";

export default function ChatPanel({ partnerId }) {
  const { userId } = useCurrentUser();
  const socket = useSocket();
  const query = useMessages(partnerId);
  const sendMessage = useSendMessage(partnerId, userId);

  return (
    <>
      <ChatMessageList query={query} currentUserId={userId} />
      <ChatInput onSend={(text) => sendMessage.mutate(text)} disabled={!socket || !partnerId} />
    </>
  );
}
