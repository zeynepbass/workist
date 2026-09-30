import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../app.js";
import Ad from "../models/ad.model.js";
import User from "../models/user.model.js";

const app = createApp();

const adFields = {
  serviceType: "Admin Panel",
  title: "Ben, admin paneli hazırlarım",
  description: "Detaylı açıklama",
  deliveryTime: "3 gün",
  revisionCount: 2,
  price: 300,
  image: "data:image/png;base64,AAAA",
  category: "software-technology",
  subcategory: "web-application",
  ownerName: "Ada",
};

describe("GET /api/categories", () => {
  it("returns categories with slugs and labels", async () => {
    const response = await request(app).get("/api/categories").expect(200);

    const slugs = response.body.map((category) => category.slug);
    expect(slugs).toEqual(["graphic-design", "writing-translation", "software-technology"]);
    expect(response.body[0].subcategories[0]).toEqual({
      slug: "logo-design",
      label: "Logo Tasarımı",
    });
  });
});

describe("GET /ilanlar", () => {
  it("matches a search term against subcategory labels", async () => {
    const user = await User.create({ email: "ada@example.com", password: "hash" });
    await Ad.create({ ...adFields, userId: user._id });
    await Ad.create({
      ...adFields,
      userId: user._id,
      category: "graphic-design",
      subcategory: "logo-design",
      serviceType: "Hata Giderme",
      title: "Ben, logo çizerim",
    });

    const response = await request(app).get("/ilanlar").query({ search: "web uygu" }).expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].subcategory).toBe("web-application");
  });

  it("treats regex characters in the search term literally", async () => {
    const user = await User.create({ email: "ada@example.com", password: "hash" });
    await Ad.create({ ...adFields, userId: user._id });

    const response = await request(app).get("/ilanlar").query({ search: ".*" }).expect(200);

    expect(response.body).toHaveLength(0);
  });

  it("filters by subcategory slug", async () => {
    const user = await User.create({ email: "ada@example.com", password: "hash" });
    await Ad.create({ ...adFields, userId: user._id });

    const response = await request(app)
      .get("/ilanlar")
      .query({ subcategory: "logo-design" })
      .expect(200);

    expect(response.body).toHaveLength(0);
  });
});

describe("POST /uye-ol", () => {
  const registration = {
    email: "Ada@Example.com ",
    password: "secret-password",
    confirmPassword: "secret-password",
    firstName: "Ada",
    lastName: "Lovelace",
  };

  it("stores the email in lowercase", async () => {
    await request(app).post("/uye-ol").send(registration).expect(201);

    const user = await User.findOne({ email: "ada@example.com" });
    expect(user).not.toBeNull();
  });

  it("rejects a duplicate email regardless of casing", async () => {
    await request(app).post("/uye-ol").send(registration).expect(201);
    await request(app)
      .post("/uye-ol")
      .send({ ...registration, email: "ADA@example.com" })
      .expect(409);
  });
});
