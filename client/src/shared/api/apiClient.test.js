import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "@/test/server";
import { useSessionStore } from "@/shared/session/sessionStore";
import apiClient from "./apiClient";

describe("apiClient", () => {
  it("attaches the in-memory access token", async () => {
    useSessionStore.getState().startSession("token-1");
    let authorization;

    server.use(
      http.get("/api/users/me", ({ request }) => {
        authorization = request.headers.get("authorization");
        return HttpResponse.json({ data: {} });
      }),
    );

    await apiClient.get("/api/users/me");
    expect(authorization).toBe("Bearer token-1");
  });

  it("refreshes once for concurrent 401s and retries the requests", async () => {
    useSessionStore.getState().startSession("expired");
    let refreshCalls = 0;

    server.use(
      http.post("/api/auth/refresh", () => {
        refreshCalls += 1;
        return HttpResponse.json({ data: { accessToken: "fresh", user: {} } });
      }),
      http.get("/api/ads", ({ request }) =>
        request.headers.get("authorization") === "Bearer fresh"
          ? HttpResponse.json({ data: [] })
          : new HttpResponse(null, { status: 401 }),
      ),
    );

    const responses = await Promise.all([apiClient.get("/api/ads"), apiClient.get("/api/ads")]);

    expect(responses.map((response) => response.status)).toEqual([200, 200]);
    expect(refreshCalls).toBe(1);
    expect(useSessionStore.getState().accessToken).toBe("fresh");
  });

  it("ends the session when refresh fails", async () => {
    useSessionStore.getState().startSession("expired");

    server.use(
      http.post("/api/auth/refresh", () => new HttpResponse(null, { status: 401 })),
      http.get("/api/ads", () => new HttpResponse(null, { status: 401 })),
    );

    await expect(apiClient.get("/api/ads")).rejects.toThrow();
    expect(useSessionStore.getState()).toMatchObject({ accessToken: null, status: "anonymous" });
  });

  it("never stores tokens in localStorage", async () => {
    server.use(
      http.post("/api/auth/refresh", () =>
        HttpResponse.json({ data: { accessToken: "fresh", user: {} } }),
      ),
    );

    const { refreshSession } = await import("./apiClient");
    await refreshSession();
    expect(window.localStorage.length).toBe(0);
  });
});
