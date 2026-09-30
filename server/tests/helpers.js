import request from "supertest";

import { createApp } from "../app.js";

export const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64",
);

export const PDF_BYTES = Buffer.from("%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n");

export const DEFAULT_PASSWORD = "correct-horse-battery";

let sequence = 0;

export function buildApp() {
  return createApp({ authLimits: { credentials: 10_000, refresh: 10_000 } });
}

export async function registerUser(app, overrides = {}) {
  sequence += 1;
  const credentials = {
    email: `user${sequence}@example.com`,
    password: DEFAULT_PASSWORD,
    firstName: `User${sequence}`,
    lastName: "Test",
    ...overrides,
  };

  await request(app)
    .post("/api/auth/register")
    .send({ ...credentials, confirmPassword: credentials.password })
    .expect(201);

  return credentials;
}

export async function loginUser(app, credentials) {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: credentials.email, password: credentials.password })
    .expect(200);

  return {
    token: response.body.data.accessToken,
    user: response.body.data.user,
    cookie: response.headers["set-cookie"].find((value) => value.startsWith("workist_rt=")),
  };
}

export async function createSession(app, overrides) {
  return loginUser(app, await registerUser(app, overrides));
}

export const authed = (token) => ({ Authorization: `Bearer ${token}` });

export const AD_FIELDS = Object.freeze({
  serviceType: "Admin Panel",
  title: "Ben, admin paneli hazırlarım",
  description: "Detaylı ve anlaşılır bir açıklama metni.",
  deliveryTime: "3 gün",
  revisionCount: "2",
  price: "300",
  category: "software-technology",
  subcategory: "web-application",
});

export function withFields(builder, fields) {
  return Object.entries(fields).reduce(
    (current, [key, value]) =>
      current.field(key, typeof value === "object" ? JSON.stringify(value) : String(value)),
    builder,
  );
}

export async function createAd(app, token, overrides = {}) {
  const response = await withFields(
    request(app).post("/api/ads").set(authed(token)),
    { ...AD_FIELDS, ...overrides },
  )
    .attach("image", PNG_BYTES, "ad.png")
    .expect(201);

  return response.body.data;
}

export const PORTFOLIO_FIELDS = Object.freeze({
  title: "Kurumsal site",
  description: "Kurumsal bir web sitesi tasarımı yaptım.",
  price: "500",
  category: "graphic-design",
  subcategory: "logo-design",
});

export async function createPortfolio(app, token, overrides = {}) {
  const response = await withFields(
    request(app).post("/api/portfolios").set(authed(token)),
    { ...PORTFOLIO_FIELDS, ...overrides },
  )
    .attach("image", PNG_BYTES, "portfolio.png")
    .expect(201);

  return response.body.data;
}
