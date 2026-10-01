import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { renderWithProviders, userFixture } from "@/test/renderWithProviders";
import { server } from "@/test/server";
import OrderActions from "./OrderActions";

const orderFixture = (overrides = {}) => ({
  id: "64b0000000000000000000f1",
  adId: "64b0000000000000000000a1",
  adTitle: "Admin paneli",
  buyer: userFixture({ id: "buyer" }),
  seller: userFixture({ id: "seller" }),
  status: "requested",
  viewerRole: "seller",
  availableActions: ["offer", "cancel"],
  requirements: "İhtiyaç",
  offer: null,
  deliveries: [],
  events: [],
  ...overrides,
});

describe("OrderActions", () => {
  it("only renders the actions the server allows", () => {
    renderWithProviders(
      <OrderActions order={orderFixture({ availableActions: ["accept", "cancel"] })} />,
    );

    expect(screen.getByRole("button", { name: "Teklifi kabul et" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "İptal et" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Teslim et" })).not.toBeInTheDocument();
  });

  it("renders nothing when no action is available", () => {
    const { container } = renderWithProviders(
      <OrderActions order={orderFixture({ availableActions: [] })} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("validates and submits an offer", async () => {
    let body;
    server.use(
      http.post("/api/orders/:id/offer", async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({
          data: { ...orderFixture(), status: "offered", availableActions: ["offer", "cancel"] },
        });
      }),
    );

    renderWithProviders(<OrderActions order={orderFixture()} />);
    await userEvent.click(screen.getByRole("button", { name: "Teklif ver" }));

    const price = screen.getByLabelText("Fiyat (TL)");
    await userEvent.clear(price);
    await userEvent.type(price, "50");
    await userEvent.click(screen.getByRole("button", { name: "Teklifi Gönder" }));
    expect(await screen.findByText("Teklif en az 100 TL olmalı.")).toBeInTheDocument();

    await userEvent.clear(price);
    await userEvent.type(price, "450");
    await userEvent.click(screen.getByRole("button", { name: "Teklifi Gönder" }));

    await waitFor(() => expect(body).toEqual({ price: 450, deliveryDays: 3, note: "" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
