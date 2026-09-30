import request from "supertest";
import { describe, expect, it } from "vitest";

import Portfolio from "../models/portfolio.model.js";
import { PNG_BYTES, authed, buildApp, createPortfolio, createSession } from "./helpers.js";

describe("portfolios", () => {
  it("lists own portfolios with a status filter and only published ones of others", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const visitor = await createSession(app);
    await createPortfolio(app, owner.token);
    await createPortfolio(app, owner.token, { status: "unpublished" });

    const own = await request(app).get("/api/portfolios").set(authed(owner.token)).expect(200);
    const drafts = await request(app)
      .get("/api/portfolios?status=unpublished")
      .set(authed(owner.token))
      .expect(200);
    const visible = await request(app)
      .get(`/api/portfolios?owner=${owner.user.id}&status=unpublished`)
      .set(authed(visitor.token))
      .expect(200);

    expect(own.body.data).toHaveLength(2);
    expect(drafts.body.data).toHaveLength(1);
    expect(visible.body.data.map((item) => item.status)).toEqual(["published"]);
  });

  it("updates fields, status and image for the owner", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const portfolio = await createPortfolio(app, owner.token);

    const updated = await request(app)
      .patch(`/api/portfolios/${portfolio.id}`)
      .set(authed(owner.token))
      .field("status", "unpublished")
      .field("category", "writing-translation")
      .field("subcategory", "article")
      .attach("image", PNG_BYTES, "new.png")
      .expect(200);

    expect(updated.body.data).toMatchObject({
      status: "unpublished",
      category: "writing-translation",
      subcategory: "article",
    });
    expect(updated.body.data.imageUrl).not.toBe(portfolio.imageUrl);
  });

  it("requires category and subcategory to change together", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const portfolio = await createPortfolio(app, owner.token);

    await request(app)
      .patch(`/api/portfolios/${portfolio.id}`)
      .set(authed(owner.token))
      .field("category", "writing-translation")
      .expect(400);
  });

  it("deletes a portfolio for the owner", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const portfolio = await createPortfolio(app, owner.token);

    await request(app)
      .delete(`/api/portfolios/${portfolio.id}`)
      .set(authed(owner.token))
      .expect(204);
    expect(await Portfolio.countDocuments()).toBe(0);
  });

  it("requires an image on creation", async () => {
    const app = buildApp();
    const owner = await createSession(app);

    await request(app)
      .post("/api/portfolios")
      .set(authed(owner.token))
      .field("title", "Başlık")
      .field("description", "Yeterince uzun bir açıklama")
      .field("price", "200")
      .field("category", "graphic-design")
      .field("subcategory", "logo-design")
      .expect(400);
  });
});

describe("avatars and ad details", () => {
  it("uploads an avatar and exposes its url", async () => {
    const app = buildApp();
    const session = await createSession(app);

    const response = await request(app)
      .put("/api/users/me/avatar")
      .set(authed(session.token))
      .attach("avatar", PNG_BYTES, "me.png")
      .expect(200);

    expect(response.body.data.avatarUrl).toMatch(/^\/uploads\/public\/avatars\//);
    await request(app).put("/api/users/me/avatar").set(authed(session.token)).expect(400);
  });

  it("returns ad details and 404 for unknown ids", async () => {
    const app = buildApp();
    const session = await createSession(app);
    const created = await request(app)
      .post("/api/ads")
      .set(authed(session.token))
      .field("serviceType", "Admin Panel")
      .field("title", "Ben, detay testi")
      .field("description", "Detay sayfası için açıklama")
      .field("deliveryTime", "2 gün")
      .field("revisionCount", "1")
      .field("price", "250")
      .field("category", "software-technology")
      .field("subcategory", "api-development")
      .attach("image", PNG_BYTES, "ad.png")
      .expect(201);

    const detail = await request(app)
      .get(`/api/ads/${created.body.data.id}`)
      .set(authed(session.token))
      .expect(200);
    expect(detail.body.data.owner.firstName).toBe(session.user.firstName);

    await request(app)
      .get("/api/ads/507f1f77bcf86cd799439011")
      .set(authed(session.token))
      .expect(404);
    await request(app).get("/api/ads/not-an-id").set(authed(session.token)).expect(400);

    await request(app)
      .delete(`/api/ads/${created.body.data.id}`)
      .set(authed(session.token))
      .expect(204);
  });

  it("confirms the password before deleting an account", async () => {
    const app = buildApp();
    const session = await createSession(app);

    await request(app)
      .delete("/api/users/me")
      .set(authed(session.token))
      .send({ password: "wrong-password" })
      .expect(401);
  });
});
