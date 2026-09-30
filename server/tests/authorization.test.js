import request from "supertest";
import { describe, expect, it } from "vitest";

import Ad from "../models/ad.model.js";
import User from "../models/user.model.js";
import {
  AD_FIELDS,
  DEFAULT_PASSWORD,
  PNG_BYTES,
  authed,
  buildApp,
  createAd,
  createPortfolio,
  createSession,
  withFields,
} from "./helpers.js";

const PROTECTED_ROUTES = [
  ["get", "/api/users/me"],
  ["patch", "/api/users/me"],
  ["delete", "/api/users/me"],
  ["get", "/api/users/507f1f77bcf86cd799439011"],
  ["get", "/api/ads"],
  ["post", "/api/ads"],
  ["get", "/api/ads/507f1f77bcf86cd799439011"],
  ["patch", "/api/ads/507f1f77bcf86cd799439011"],
  ["delete", "/api/ads/507f1f77bcf86cd799439011"],
  ["get", "/api/portfolios"],
  ["post", "/api/portfolios"],
  ["patch", "/api/portfolios/507f1f77bcf86cd799439011"],
  ["delete", "/api/portfolios/507f1f77bcf86cd799439011"],
  ["get", "/api/conversations"],
  ["get", "/api/conversations/507f1f77bcf86cd799439011/messages"],
  ["delete", "/api/conversations/507f1f77bcf86cd799439011"],
  ["get", "/api/orders"],
  ["post", "/api/orders"],
  ["post", "/api/orders/507f1f77bcf86cd799439011/accept"],
  ["get", "/api/reviews"],
];

describe("protected routes", () => {
  it.each(PROTECTED_ROUTES)("%s %s requires authentication", async (method, path) => {
    const response = await request(buildApp())[method](path).expect(401);
    expect(response.body.error.code).toBe("UNAUTHORIZED");
  });
});

describe("ad ownership", () => {
  it("does not let another user update or delete an ad", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const intruder = await createSession(app);
    const ad = await createAd(app, owner.token);

    await request(app)
      .patch(`/api/ads/${ad.id}`)
      .set(authed(intruder.token))
      .field("title", "Ele geçirildi")
      .expect(403);
    await request(app).delete(`/api/ads/${ad.id}`).set(authed(intruder.token)).expect(403);

    const stored = await Ad.findById(ad.id);
    expect(stored.title).toBe(AD_FIELDS.title);
  });

  it("takes the owner from the token, never from the body", async () => {
    const app = buildApp();
    const author = await createSession(app);
    const victim = await createSession(app);

    const response = await withFields(request(app).post("/api/ads").set(authed(author.token)), {
      ...AD_FIELDS,
      owner: victim.user.id,
    })
      .attach("image", PNG_BYTES, "ad.png")
      .expect(400);

    expect(response.body.error.details[0].path).toBe("body");
  });

  it("returns 404 for a missing ad", async () => {
    const app = buildApp();
    const session = await createSession(app);
    await request(app)
      .delete("/api/ads/507f1f77bcf86cd799439011")
      .set(authed(session.token))
      .expect(404);
  });
});

describe("portfolio ownership", () => {
  it("rejects updates from other users and hides unpublished portfolios", async () => {
    const app = buildApp();
    const owner = await createSession(app);
    const intruder = await createSession(app);
    const portfolio = await createPortfolio(app, owner.token, { status: "unpublished" });

    await request(app)
      .patch(`/api/portfolios/${portfolio.id}`)
      .set(authed(intruder.token))
      .field("status", "published")
      .expect(403);
    await request(app)
      .get(`/api/portfolios/${portfolio.id}`)
      .set(authed(intruder.token))
      .expect(404);
    await request(app)
      .get(`/api/portfolios/${portfolio.id}`)
      .set(authed(owner.token))
      .expect(200);
  });
});

describe("profile updates", () => {
  it("rejects fields outside the allow list", async () => {
    const app = buildApp();
    const session = await createSession(app);

    await request(app)
      .patch("/api/users/me")
      .set(authed(session.token))
      .send({ password: "hijacked-password", email: "evil@example.com" })
      .expect(400);

    const user = await User.findById(session.user.id);
    expect(user.email).toBe(session.user.email);
  });

  it("updates allowed fields", async () => {
    const app = buildApp();
    const session = await createSession(app);

    const response = await request(app)
      .patch("/api/users/me")
      .set(authed(session.token))
      .send({ title: "Tasarımcı", skills: ["Figma"] })
      .expect(200);

    expect(response.body.data).toMatchObject({ title: "Tasarımcı", skills: ["Figma"] });
  });

  it("exposes only public fields of other users", async () => {
    const app = buildApp();
    const viewer = await createSession(app);
    const other = await createSession(app);

    const response = await request(app)
      .get(`/api/users/${other.user.id}`)
      .set(authed(viewer.token))
      .expect(200);

    expect(Object.keys(response.body.data).sort()).toEqual(
      ["avatarUrl", "firstName", "id", "lastName", "rating", "title"].sort(),
    );
  });

  it("requires the current password to change it and revokes sessions", async () => {
    const app = buildApp();
    const session = await createSession(app);

    await request(app)
      .patch("/api/users/me/password")
      .set(authed(session.token))
      .send({ currentPassword: "wrong-password", newPassword: "another-password" })
      .expect(401);
    await request(app)
      .patch("/api/users/me/password")
      .set(authed(session.token))
      .send({ currentPassword: DEFAULT_PASSWORD, newPassword: "another-password" })
      .expect(204);
    await request(app).post("/api/auth/refresh").set("Cookie", session.cookie).expect(401);
  });

  it("deletes the account with its content after password confirmation", async () => {
    const app = buildApp();
    const session = await createSession(app);
    await createAd(app, session.token);

    await request(app)
      .delete("/api/users/me")
      .set(authed(session.token))
      .send({ password: DEFAULT_PASSWORD })
      .expect(204);

    expect(await User.countDocuments()).toBe(0);
    expect(await Ad.countDocuments()).toBe(0);
  });
});
