import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { adFixture, createTestQueryClient } from "@/test/renderWithProviders";
import { server } from "@/test/server";
import { useAdList, useDeleteAd } from "./useAds";

function setup() {
  const queryClient = createTestQueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => ({ list: useAdList({ owner: "me" }), remove: useDeleteAd() }), {
    wrapper,
  });
}

describe("useDeleteAd", () => {
  it("removes the ad optimistically", async () => {
    let releaseDelete;
    server.use(
      http.get("/api/ads", () =>
        HttpResponse.json({ data: [adFixture()], meta: { nextCursor: null } }),
      ),
      http.delete(
        "/api/ads/:id",
        () =>
          new Promise(
            (resolve) => (releaseDelete = () => resolve(new HttpResponse(null, { status: 204 }))),
          ),
      ),
    );

    const { result } = setup();
    await waitFor(() => expect(result.current.list.ads).toHaveLength(1));

    server.use(
      http.get("/api/ads", () => HttpResponse.json({ data: [], meta: { nextCursor: null } })),
    );
    act(() => result.current.remove.mutate(adFixture().id));

    await waitFor(() => expect(result.current.list.ads).toHaveLength(0));
    releaseDelete();
    await waitFor(() => expect(result.current.remove.isSuccess).toBe(true));
  });

  it("restores the ad when the server rejects the delete", async () => {
    server.use(
      http.get("/api/ads", () =>
        HttpResponse.json({ data: [adFixture()], meta: { nextCursor: null } }),
      ),
      http.delete("/api/ads/:id", () =>
        HttpResponse.json({ error: { code: "FORBIDDEN", message: "Yetkisiz" } }, { status: 403 }),
      ),
    );

    const { result } = setup();
    await waitFor(() => expect(result.current.list.ads).toHaveLength(1));

    act(() => result.current.remove.mutate(adFixture().id));

    await waitFor(() => expect(result.current.remove.isError).toBe(true));
    expect(result.current.list.ads).toHaveLength(1);
  });
});
