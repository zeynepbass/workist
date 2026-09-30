import { existsSync } from "node:fs";
import path from "node:path";

import request from "supertest";
import { describe, expect, it } from "vitest";

import {
  AD_FIELDS,
  PNG_BYTES,
  authed,
  buildApp,
  createAd,
  createSession,
  withFields,
} from "./helpers.js";

const storedPath = (imageUrl) =>
  path.join(process.env.UPLOAD_DIR, imageUrl.replace(/^\/uploads\//, ""));

describe("ad creation", () => {
  it("stores the image on disk and returns its public url", async () => {
    const app = buildApp();
    const session = await createSession(app);
    const ad = await createAd(app, session.token, {
      addons: { logo: true, sourceCode: false, backgroundMusic: false },
    });

    expect(ad.imageUrl).toMatch(/^\/uploads\/public\/ads\/[a-f0-9]{24}\/[\w-]+\.png$/);
    expect(ad.addons.logo).toBe(true);
    expect(ad.owner.id).toBe(session.user.id);
    expect(existsSync(storedPath(ad.imageUrl))).toBe(true);

    await request(app).get(ad.imageUrl).expect(200).expect("Content-Type", /image\/png/);
  });

  it("rejects files whose content is not an allowed image", async () => {
    const app = buildApp();
    const session = await createSession(app);

    const response = await withFields(request(app).post("/api/ads").set(authed(session.token)), AD_FIELDS)
      .attach("image", Buffer.from("MZ fake executable"), { filename: "virus.png", contentType: "image/png" })
      .expect(415);

    expect(response.body.error.code).toBe("UNSUPPORTED_MEDIA_TYPE");
  });

  it("rejects images larger than the limit", async () => {
    const app = buildApp();
    const session = await createSession(app);
    const oversized = Buffer.concat([PNG_BYTES, Buffer.alloc(5 * 1024 * 1024)]);

    await withFields(request(app).post("/api/ads").set(authed(session.token)), AD_FIELDS)
      .attach("image", oversized, "big.png")
      .expect(413);
  });

  it("requires an image", async () => {
    const app = buildApp();
    const session = await createSession(app);

    await withFields(request(app).post("/api/ads").set(authed(session.token)), AD_FIELDS).expect(400);
  });

  it("rejects a subcategory from another category", async () => {
    const app = buildApp();
    const session = await createSession(app);

    await withFields(request(app).post("/api/ads").set(authed(session.token)), {
      ...AD_FIELDS,
      subcategory: "logo-design",
    })
      .attach("image", PNG_BYTES, "ad.png")
      .expect(400);
  });
});

describe("ad listing", () => {
  it("paginates with a cursor", async () => {
    const app = buildApp();
    const session = await createSession(app);

    for (let index = 0; index < 5; index += 1) {
      await createAd(app, session.token, { title: `Ben, ilan numarası ${index}` });
    }

    const first = await request(app).get("/api/ads?limit=2").set(authed(session.token)).expect(200);
    const second = await request(app)
      .get(`/api/ads?limit=2&cursor=${first.body.meta.nextCursor}`)
      .set(authed(session.token))
      .expect(200);

    const titles = [...first.body.data, ...second.body.data].map((ad) => ad.title);
    expect(new Set(titles).size).toBe(4);
    expect(titles[0]).toBe("Ben, ilan numarası 4");
  });

  it("filters by owner, subcategory and label search", async () => {
    const app = buildApp();
    const seller = await createSession(app);
    const other = await createSession(app);
    await createAd(app, seller.token);
    await createAd(app, other.token, {
      category: "graphic-design",
      subcategory: "logo-design",
      title: "Ben, logo çizerim",
      serviceType: "Hata Giderme",
    });

    const mine = await request(app).get("/api/ads?owner=me").set(authed(seller.token)).expect(200);
    const logos = await request(app)
      .get("/api/ads?subcategory=logo-design")
      .set(authed(seller.token))
      .expect(200);
    const byLabel = await request(app)
      .get(`/api/ads?search=${encodeURIComponent("web uygu")}`)
      .set(authed(seller.token))
      .expect(200);

    expect(mine.body.data).toHaveLength(1);
    expect(logos.body.data[0].title).toBe("Ben, logo çizerim");
    expect(byLabel.body.data.map((ad) => ad.subcategory)).toEqual(["web-application"]);
  });

  it("treats regex characters in search literally", async () => {
    const app = buildApp();
    const session = await createSession(app);
    await createAd(app, session.token);

    const response = await request(app).get("/api/ads?search=.*").set(authed(session.token)).expect(200);
    expect(response.body.data).toHaveLength(0);
  });

  it("rejects an invalid cursor", async () => {
    const app = buildApp();
    const session = await createSession(app);
    await request(app).get("/api/ads?cursor=garbage").set(authed(session.token)).expect(400);
  });
});

describe("ad updates", () => {
  it("replaces the image and removes the old file", async () => {
    const app = buildApp();
    const session = await createSession(app);
    const ad = await createAd(app, session.token);

    const response = await request(app)
      .patch(`/api/ads/${ad.id}`)
      .set(authed(session.token))
      .field("price", "450")
      .attach("image", PNG_BYTES, "new.png")
      .expect(200);

    expect(response.body.data.price).toBe(450);
    expect(response.body.data.imageUrl).not.toBe(ad.imageUrl);
    expect(existsSync(storedPath(ad.imageUrl))).toBe(false);
  });
});

describe("meta endpoints", () => {
  it("serves categories and health", async () => {
    const app = buildApp();
    const categories = await request(app).get("/api/categories").expect(200);
    expect(categories.body.data.map((category) => category.slug)).toEqual([
      "graphic-design",
      "writing-translation",
      "software-technology",
    ]);

    await request(app).get("/health").expect(200, { status: "ok", database: "up" });
  });

  it("returns a consistent error body for unknown routes", async () => {
    const response = await request(buildApp()).get("/api/nothing-here").expect(404);
    expect(response.body.error).toMatchObject({ code: "NOT_FOUND", requestId: expect.any(String) });
  });

  it("serves the OpenAPI document", async () => {
    const response = await request(buildApp()).get("/api/docs/openapi.json").expect(200);
    expect(response.body.paths).toHaveProperty("/api/orders/{id}/offer");
  });

  it("rejects cross-origin requests from unknown origins", async () => {
    const response = await request(buildApp())
      .get("/api/categories")
      .set("Origin", "https://evil.example.com");

    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
