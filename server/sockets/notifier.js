let server = null;

export const userRoom = (userId) => `user:${userId}`;

export function attachNotifier(io) {
  server = io;
}

export function detachNotifier() {
  server = null;
}

export function notifyUsers(userIds, event, payload) {
  if (!server) {
    return;
  }

  const rooms = [...new Set(userIds.map((id) => userRoom(String(id))))];
  server.to(rooms).emit(event, payload);
}
