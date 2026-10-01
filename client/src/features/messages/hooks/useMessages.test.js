import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import { createTestQueryClient } from "@/test/renderWithProviders";
import { server } from "@/test/server";

import { useMessages, useSendMessage } from "./useMessages";

const { fakeSocket } = vi.hoisted(() => {
  const socket = { connected: true, emit: vi.fn() };
  socket.timeout = () => socket;
  return { fakeSocket: socket };
});

vi.mock("@/shared/socket/SocketProvider", () => ({ useSocket: () => fakeSocket }));

const PARTNER = "64b000000000000000000002";
const ME = "64b000000000000000000001";

function setup() {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => ({ thread: useMessages(PARTNER), send: useSendMessage(PARTNER, ME) }), {
    wrapper,
  });
}

describe("useSendMessage", () => {
  it("shows the message immediately and replaces it with the acknowledged one", async () => {
    server.use(
      http.get("/api/conversations/:id/messages", () =>
        HttpResponse.json({ data: [], meta: { nextCursor: null } }),
      ),
      http.get("/api/conversations", () => HttpResponse.json({ data: [] })),
    );

    let acknowledge;
    fakeSocket.emit.mockImplementation((event, payload, callback) => {
      acknowledge = () =>
        callback(null, {
          ok: true,
          data: {
            id: "m1",
            senderId: ME,
            recipientId: PARTNER,
            text: payload.text,
            sentAt: new Date().toISOString(),
          },
        });
    });

    const { result } = setup();
    await waitFor(() => expect(result.current.thread.isSuccess).toBe(true));

    act(() => result.current.send.mutate("Merhaba"));

    await waitFor(() => expect(result.current.thread.messages).toHaveLength(1));
    expect(result.current.thread.messages[0]).toMatchObject({ text: "Merhaba", pending: true });
    expect(fakeSocket.emit).toHaveBeenCalledWith(
      "message:send",
      { recipientId: PARTNER, text: "Merhaba" },
      expect.any(Function),
    );

    act(() => acknowledge());

    await waitFor(() =>
      expect(result.current.thread.messages[0]).toMatchObject({ id: "m1", pending: false }),
    );
    expect(result.current.thread.messages).toHaveLength(1);
  });

  it("removes the pending message when sending fails", async () => {
    server.use(
      http.get("/api/conversations/:id/messages", () =>
        HttpResponse.json({ data: [], meta: { nextCursor: null } }),
      ),
    );
    fakeSocket.emit.mockImplementation((event, payload, callback) =>
      callback(null, { ok: false, error: { message: "Alıcı bulunamadı." } }),
    );

    const { result } = setup();
    await waitFor(() => expect(result.current.thread.isSuccess).toBe(true));

    act(() => result.current.send.mutate("Selam"));

    await waitFor(() => expect(result.current.send.isError).toBe(true));
    expect(result.current.thread.messages).toHaveLength(0);
  });
});
