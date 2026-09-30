import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../app.js";
import RefreshToken from "../models/refreshToken.model.js";
import { DEFAULT_PASSWORD, authed, buildApp, loginUser, registerUser } from "./helpers.js";

const refresh = (app, cookie) => request(app).post("/api/auth/refresh").set("Cookie", cookie);

describe("registration", () => {
  it("never returns the password hash", async () => {
    const app = buildApp();
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "Ada@Example.com",
        password: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD,
        firstName: "Ada",
        lastName: "Lovelace",
      })
      .expect(201);

    expect(response.body.data.user.email).toBe("ada@example.com");
    expect(JSON.stringify(response.body)).not.toMatch(/password/i);
  });

  it("rejects a duplicate email regardless of casing", async () => {
    const app = buildApp();
    await registerUser(app, { email: "ada@example.com" });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "ADA@example.com",
        password: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD,
        firstName: "Ada",
        lastName: "L",
      })
      .expect(409);

    expect(response.body.error.code).toBe("CONFLICT");
  });

  it("validates password length and confirmation", async () => {
    const response = await request(buildApp())
      .post("/api/auth/register")
      .send({ email: "a@b.co", password: "short", confirmPassword: "other", firstName: "A", lastName: "B" })
      .expect(400);

    const paths = response.body.error.details.map((detail) => detail.path);
    expect(paths).toContain("body.password");
  });
});

describe("login", () => {
  it("returns an access token and sets an httpOnly refresh cookie", async () => {
    const app = buildApp();
    const session = await loginUser(app, await registerUser(app));

    expect(session.token).toEqual(expect.any(String));
    expect(session.cookie).toMatch(/HttpOnly/);
    expect(session.cookie).toMatch(/SameSite=Lax/);
    expect(session.cookie).toMatch(/Path=\/api\/auth/);
    expect(session.user).not.toHaveProperty("password");
  });

  it("uses the same message for unknown email and wrong password", async () => {
    const app = buildApp();
    const credentials = await registerUser(app);

    const wrongPassword = await request(app)
      .post("/api/auth/login")
      .send({ email: credentials.email, password: "not-the-password" })
      .expect(401);
    const unknownEmail = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "whatever-password" })
      .expect(401);

    expect(wrongPassword.body.error.message).toBe(unknownEmail.body.error.message);
  });

  it("rejects operator injection in credentials", async () => {
    await request(buildApp())
      .post("/api/auth/login")
      .send({ email: { $gt: "" }, password: { $gt: "" } })
      .expect(400);
  });

  it("rate limits repeated attempts", async () => {
    const app = createApp();
    const attempt = () =>
      request(app).post("/api/auth/login").send({ email: "x@example.com", password: "wrong-pass" });

    const statuses = [];
    for (let index = 0; index < 11; index += 1) {
      statuses.push((await attempt()).status);
    }

    expect(statuses.slice(0, 10).every((status) => status === 401)).toBe(true);
    expect(statuses[10]).toBe(429);
  });
});

describe("refresh token rotation", () => {
  it("issues a new refresh token and revokes the old one", async () => {
    const app = buildApp();
    const session = await loginUser(app, await registerUser(app));

    const rotated = await refresh(app, session.cookie).expect(200);
    const newCookie = rotated.headers["set-cookie"].find((value) => value.startsWith("workist_rt="));

    expect(rotated.body.data.accessToken).toEqual(expect.any(String));
    expect(newCookie).not.toBe(session.cookie);
    await refresh(app, newCookie).expect(200);
  });

  it("revokes the whole family when a rotated token is reused", async () => {
    const app = buildApp();
    const session = await loginUser(app, await registerUser(app));

    const rotated = await refresh(app, session.cookie).expect(200);
    const newCookie = rotated.headers["set-cookie"].find((value) => value.startsWith("workist_rt="));

    await refresh(app, session.cookie).expect(401);
    await refresh(app, newCookie).expect(401);

    const active = await RefreshToken.countDocuments({ revokedAt: { $exists: false } });
    expect(active).toBe(0);
  });

  it("rejects refresh after logout", async () => {
    const app = buildApp();
    const session = await loginUser(app, await registerUser(app));

    await request(app).post("/api/auth/logout").set("Cookie", session.cookie).expect(204);
    await refresh(app, session.cookie).expect(401);
  });

  it("rejects refresh without a cookie", async () => {
    await request(buildApp()).post("/api/auth/refresh").expect(401);
  });
});

describe("access token", () => {
  it("is required and must be valid", async () => {
    const app = buildApp();
    await request(app).get("/api/users/me").expect(401);
    await request(app).get("/api/users/me").set(authed("not-a-jwt")).expect(401);
  });
});
