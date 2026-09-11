export const messageAdapter = (message) => ({
    id: message._id,
    senderId: message.gonderenId,
    receiverId: message.aliciId,
    text: message.text,
    time: message.time,
});