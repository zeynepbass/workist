import request from "supertest";
import { describe, expect, it } from "vitest";

import Ad from "../models/ad.model.js";
import User from "../models/user.model.js";
import { PDF_BYTES, authed, buildApp, createAd, createSession } from "./helpers.js";

async function setup({ revisionCount = "1" } = {}) {
  const app = buildApp();
  const seller = await createSession(app);
  const buyer = await createSession(app);
  const stranger = await createSession(app);
  const ad = await createAd(app, seller.token, { revisionCount });

  return { app, seller, buyer, stranger, ad };
}

const post = (app, token, path, body = {}) =>
  request(app).post(path).set(authed(token)).send(body);

async function placeOrder({ app, buyer, ad }) {
  const response = await post(app, buyer.token, "/api/orders", {
    adId: ad.id,
    requirements: "Admin paneli için detaylı ihtiyaç listesi.",
  }).expect(201);

  return response.body.data;
}

async function activeOrder(context) {
  const order = await placeOrder(context);
  await post(context.app, context.seller.token, `/api/orders/${order.id}/offer`, {
    price: 400,
    deliveryDays: 3,
  }).expect(200);
  await post(context.app, context.buyer.token, `/api/orders/${order.id}/accept`).expect(200);
  return order;
}

describe("order lifecycle", () => {
  it("runs from request to review and updates ratings", async () => {
    const context = await setup();
    const { app, seller, buyer, ad } = context;
    const order = await placeOrder(context);

    expect(order).toMatchObject({ status: "requested", viewerRole: "buyer", availableActions: ["cancel"] });

    const offered = await post(app, seller.token, `/api/orders/${order.id}/offer`, {
      price: 400,
      deliveryDays: 3,
      note: "3 günde teslim",
    }).expect(200);
    expect(offered.body.data.offer).toMatchObject({ price: 400, deliveryDays: 3 });

    const accepted = await post(app, buyer.token, `/api/orders/${order.id}/accept`).expect(200);
    expect(accepted.body.data.status).toBe("active");
    expect(new Date(accepted.body.data.dueAt).getTime()).toBeGreaterThan(Date.now());

    const delivered = await request(app)
      .post(`/api/orders/${order.id}/deliver`)
      .set(authed(seller.token))
      .field("note", "İlk teslim")
      .attach("files", PDF_BYTES, "rapor.pdf")
      .expect(200);
    expect(delivered.body.data.deliveries[0].files[0]).toMatchObject({
      name: "rapor.pdf",
      contentType: "application/pdf",
    });

    await post(app, buyer.token, `/api/orders/${order.id}/request-revision`, { note: "Renk" }).expect(200);
    await request(app)
      .post(`/api/orders/${order.id}/deliver`)
      .set(authed(seller.token))
      .field("note", "Revize edildi")
      .expect(200);
    await post(app, buyer.token, `/api/orders/${order.id}/request-revision`).expect(409);

    const completed = await post(app, buyer.token, `/api/orders/${order.id}/complete`).expect(200);
    expect(completed.body.data.status).toBe("completed");
    expect(completed.body.data.events.map((event) => event.action)).toEqual([
      "create",
      "offer",
      "accept",
      "deliver",
      "request_revision",
      "deliver",
      "complete",
    ]);

    await post(app, buyer.token, `/api/orders/${order.id}/review`, { rating: 4, comment: "İyi" }).expect(201);
    await post(app, buyer.token, `/api/orders/${order.id}/review`, { rating: 5 }).expect(409);

    const storedAd = await Ad.findById(ad.id);
    const storedSeller = await User.findById(seller.user.id);
    expect(storedAd.rating).toMatchObject({ average: 4, count: 1 });
    expect(storedSeller.rating).toMatchObject({ average: 4, count: 1 });

    const reviews = await request(app)
      .get(`/api/reviews?adId=${ad.id}`)
      .set(authed(buyer.token))
      .expect(200);
    expect(reviews.body.data[0]).toMatchObject({ rating: 4, comment: "İyi" });
  });
});

describe("order authorization", () => {
  it("hides orders from users who are not a party", async () => {
    const context = await setup();
    const order = await placeOrder(context);

    await request(context.app)
      .get(`/api/orders/${order.id}`)
      .set(authed(context.stranger.token))
      .expect(404);
    await post(context.app, context.stranger.token, `/api/orders/${order.id}/cancel`).expect(404);
  });

  it("only allows each party its own transitions", async () => {
    const context = await setup();
    const order = await placeOrder(context);

    const buyerOffers = await post(context.app, context.buyer.token, `/api/orders/${order.id}/offer`, {
      price: 150,
      deliveryDays: 1,
    }).expect(403);
    expect(buyerOffers.body.error.code).toBe("FORBIDDEN");

    await post(context.app, context.seller.token, `/api/orders/${order.id}/accept`).expect(409);
  });

  it("does not let buyers order their own ads", async () => {
    const context = await setup();
    await post(context.app, context.seller.token, "/api/orders", {
      adId: context.ad.id,
      requirements: "Kendi ilanıma sipariş vermeye çalışıyorum.",
    }).expect(400);
  });

  it("only lets the buyer review a completed order", async () => {
    const context = await setup();
    const order = await activeOrder(context);

    await post(context.app, context.buyer.token, `/api/orders/${order.id}/review`, { rating: 5 }).expect(409);
    await post(context.app, context.seller.token, `/api/orders/${order.id}/review`, { rating: 5 }).expect(403);
  });

  it("serves delivery files to participants only", async () => {
    const context = await setup();
    const order = await activeOrder(context);

    const delivered = await request(context.app)
      .post(`/api/orders/${order.id}/deliver`)
      .set(authed(context.seller.token))
      .attach("files", PDF_BYTES, "../../etc/passwd.pdf")
      .expect(200);

    const file = delivered.body.data.deliveries[0].files[0];
    expect(file.name).toBe("passwd.pdf");
    const path = `/api/orders/${order.id}/files/${file.id}`;

    const download = await request(context.app).get(path).set(authed(context.buyer.token)).expect(200);
    expect(download.headers["content-disposition"]).toMatch(/attachment/);
    await request(context.app).get(path).set(authed(context.stranger.token)).expect(404);
  });

  it("requires a note or file to deliver", async () => {
    const context = await setup();
    const order = await activeOrder(context);

    await post(context.app, context.seller.token, `/api/orders/${order.id}/deliver`).expect(400);
  });
});

describe("order listing", () => {
  it("separates purchases from sales", async () => {
    const context = await setup();
    await placeOrder(context);

    const purchases = await request(context.app)
      .get("/api/orders?role=buyer")
      .set(authed(context.buyer.token))
      .expect(200);
    const sales = await request(context.app)
      .get("/api/orders?role=seller&status=requested")
      .set(authed(context.seller.token))
      .expect(200);
    const sellerPurchases = await request(context.app)
      .get("/api/orders?role=buyer")
      .set(authed(context.seller.token))
      .expect(200);

    expect(purchases.body.data).toHaveLength(1);
    expect(sales.body.data).toHaveLength(1);
    expect(sellerPurchases.body.data).toHaveLength(0);
  });
});
