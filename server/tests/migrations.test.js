import mongoose from "mongoose";
import { describe, expect, it } from "vitest";

import * as englishFieldNames from "../migrations/20260930120000-english-field-names.js";
import * as categorySlugs from "../migrations/20260930120100-category-slugs.js";
import * as uniqueUserEmail from "../migrations/20260930120200-unique-user-email.js";

const db = () => mongoose.connection.db;

async function seedLegacyData() {
  await db()
    .collection("ilanlarims")
    .insertOne({
      hizmetTuru: "Admin Panel",
      fiyat: 200,
      file: "data:image/png;base64,AAAA",
      kodFiyatlandirma: { logo: true, kaynakKod: true, fonMuzigi: false },
      ekstraOzellikler: { hizliTeslimat: true, fullHd: false },
      selectedCategory: "Yazılım & Teknoloji",
      selectedSubcategory: "Web Uygulaması",
      kullaniciAd: "Ada",
    });
  await db()
    .collection("portfolyos")
    .insertMany([
      { durum: "yayinda", selectedCategory: "Grafik & Tasarım" },
      { durum: "yayindaDegil", selectedCategory: "Yazı & Çeviri" },
    ]);
  await db()
    .collection("users")
    .insertOne({ email: " Ada@Example.com", unvan: "Dev", selectedFile: "x", id: "1" });
  await db().collection("messages").insertOne({ gonderenId: "a", aliciId: "b", time: new Date() });
}

describe("english field names migration", () => {
  it("renames legacy collections and fields", async () => {
    await seedLegacyData();

    await englishFieldNames.up(db());
    await categorySlugs.up(db());

    const ad = await db().collection("ads").findOne();
    expect(ad).toMatchObject({
      serviceType: "Admin Panel",
      price: 200,
      image: "data:image/png;base64,AAAA",
      addons: { logo: true, sourceCode: true, backgroundMusic: false },
      extras: { fastDelivery: true, fullHd: false },
      category: "software-technology",
      subcategory: "web-application",
      ownerName: "Ada",
    });

    const statuses = await db()
      .collection("portfolios")
      .find()
      .map((portfolio) => portfolio.status)
      .toArray();
    expect(statuses.sort()).toEqual(["published", "unpublished"]);

    const user = await db().collection("users").findOne();
    expect(user.title).toBe("Dev");
    expect(user).not.toHaveProperty("selectedFile");
    expect(user).not.toHaveProperty("id");

    const message = await db().collection("messages").findOne();
    expect(message).toMatchObject({ senderId: "a", recipientId: "b" });
  });

  it("restores the legacy shape on down", async () => {
    await seedLegacyData();

    await englishFieldNames.up(db());
    await categorySlugs.up(db());
    await categorySlugs.down(db());
    await englishFieldNames.down(db());

    const ad = await db().collection("ilanlarims").findOne();
    expect(ad).toMatchObject({
      hizmetTuru: "Admin Panel",
      kodFiyatlandirma: { kaynakKod: true },
      selectedCategory: "Yazılım & Teknoloji",
    });
  });
});

describe("unique user email migration", () => {
  it("normalizes emails and adds a unique index", async () => {
    await db().collection("users").insertOne({ email: " Ada@Example.com " });

    await uniqueUserEmail.up(db());

    const user = await db().collection("users").findOne();
    expect(user.email).toBe("ada@example.com");
    await expect(db().collection("users").insertOne({ email: "ada@example.com" })).rejects.toThrow(
      /duplicate key/,
    );
  });

  it("refuses to run when normalized emails collide", async () => {
    await db()
      .collection("users")
      .insertMany([{ email: "ada@example.com" }, { email: "ADA@example.com" }]);

    await expect(uniqueUserEmail.up(db())).rejects.toThrow(/ada@example.com/);
  });
});
