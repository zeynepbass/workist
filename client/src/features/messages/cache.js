import { queryKeys } from "@/shared/api";

function updateNewestPage(queryClient, partnerId, update) {
  queryClient.setQueryData(queryKeys.conversations.messages(partnerId), (data) => {
    if (!data) return data;

    const [newest, ...older] = data.pages;
    return { ...data, pages: [{ ...newest, items: update(newest.items) }, ...older] };
  });
}

const containsMessage = (data, id) =>
  data?.pages.some((page) => page.items.some((item) => item.id === id));

export function addMessage(queryClient, partnerId, message) {
  const data = queryClient.getQueryData(queryKeys.conversations.messages(partnerId));

  if (containsMessage(data, message.id)) return;
  updateNewestPage(queryClient, partnerId, (items) => [...items, message]);
}

export function removeMessage(queryClient, partnerId, messageId) {
  queryClient.setQueryData(queryKeys.conversations.messages(partnerId), (data) =>
    data
      ? {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            items: page.items.filter((item) => item.id !== messageId),
          })),
        }
      : data,
  );
}

export function partnerOf(message, userId) {
  return message.senderId === userId ? message.recipientId : message.senderId;
}
