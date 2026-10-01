import path from "node:path";

import { expect, test } from "@playwright/test";

const PASSWORD = "e2e-password-123";
const IMAGE = path.resolve(import.meta.dirname, "../server/scripts/seed-assets/design.png");
const runId = Date.now();

const people = {
  seller: { firstName: "Selin", lastName: "Satıcı", email: `seller-${runId}@example.com` },
  buyer: { firstName: "Burak", lastName: "Alıcı", email: `buyer-${runId}@example.com` },
};

async function register(page, person) {
  await page.goto("/kayit-ol");
  await page.getByLabel("Adı").fill(person.firstName);
  await page.getByLabel("Soyadı").fill(person.lastName);
  await page.getByLabel("E-posta").fill(person.email);
  await page.getByLabel("Parola", { exact: true }).fill(PASSWORD);
  await page.getByLabel("Parola Tekrar").fill(PASSWORD);
  await page.getByRole("button", { name: "Kayıt Ol" }).click();
  await expect(page.getByRole("heading", { name: "Giriş Yap" })).toBeVisible();
}

async function login(page, person) {
  await page.goto("/");
  await page.getByLabel("E-posta").fill(person.email);
  await page.getByLabel("Parola", { exact: true }).fill(PASSWORD);
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await expect(
    page.getByRole("heading", { name: new RegExp(`Merhaba ${person.firstName}`) }),
  ).toBeVisible();
}

async function createAd(page) {
  await page.goto("/ilanlarim");
  await page.getByRole("button", { name: "Yeni İş İlanı Ekle" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: /Yazılım & Teknoloji/ }).click();
  await dialog.getByRole("button", { name: "Web Uygulaması" }).click();
  await dialog.getByRole("button", { name: "Devam Et" }).click();
  await dialog.getByLabel("Hizmet türü").selectOption("Admin Panel");
  await dialog.getByLabel("Başlık").fill(`Ben, uçtan uca test paneli yaparım ${runId}`);
  await dialog.getByLabel("Teslim süresi").fill("3 gün");
  await dialog.getByLabel("Revizyon hakkı").fill("1");
  await dialog.getByLabel("Temel fiyat (TL)").fill("300");
  await dialog.getByLabel("Açıklama").fill("Uçtan uca test için oluşturulan ilan açıklaması.");
  await dialog.getByLabel("İlan görseli").setInputFiles(IMAGE);
  await dialog.getByRole("button", { name: "Kaydet" }).click();
  await expect(
    page.getByRole("heading", { name: new RegExp(`uçtan uca test paneli yaparım ${runId}`) }),
  ).toBeVisible();
}

test("register, list an ad, chat, order, deliver and review", async ({ browser }) => {
  const sellerPage = await (await browser.newContext()).newPage();
  const buyerPage = await (await browser.newContext()).newPage();

  await register(sellerPage, people.seller);
  await login(sellerPage, people.seller);
  await createAd(sellerPage);

  await register(buyerPage, people.buyer);
  await login(buyerPage, people.buyer);

  await buyerPage.goto(`/ilanlar?search=${encodeURIComponent(String(runId))}`);
  await buyerPage.getByRole("link", { name: new RegExp(String(runId)) }).click();

  await buyerPage.getByRole("button", { name: "Satıcıya Mesaj At" }).click();
  const chat = buyerPage.getByRole("dialog", { name: /ile sohbet/ });
  await chat.getByLabel("Mesajınız").fill("Merhaba, panel için detay konuşabilir miyiz?");
  await chat.getByRole("button", { name: "Gönder" }).click();
  await expect(chat.getByText("Merhaba, panel için detay konuşabilir miyiz?")).toBeVisible();
  await chat.getByRole("button", { name: "Sohbeti kapat" }).click();

  await sellerPage.goto("/sohbet");
  await sellerPage.getByRole("button", { name: new RegExp(people.buyer.firstName) }).click();
  await expect(sellerPage.getByText("Merhaba, panel için detay konuşabilir miyiz?")).toBeVisible();
  await sellerPage.getByLabel("Mesajınız").fill("Tabii, sipariş talebi oluşturabilirsiniz.");
  await sellerPage.getByRole("button", { name: "Gönder" }).click();

  await buyerPage
    .getByLabel("Ne istediğini anlat")
    .fill("Rol tabanlı yetkilendirmesi olan bir yönetim paneli istiyorum.");
  await buyerPage.getByRole("button", { name: "Sipariş Talebi Gönder" }).click();
  await expect(buyerPage.getByText("Talep edildi")).toBeVisible();
  const orderUrl = buyerPage.url();

  await sellerPage.goto("/istekler");
  await sellerPage.getByRole("link", { name: new RegExp(String(runId)) }).click();
  await sellerPage.getByRole("button", { name: "Teklif ver" }).click();
  await sellerPage.getByLabel("Fiyat (TL)").fill("350");
  await sellerPage.getByLabel("Teslim süresi (gün)").fill("2");
  await sellerPage.getByRole("button", { name: "Teklifi Gönder" }).click();
  await expect(sellerPage.getByText("Teklif verildi").first()).toBeVisible();

  await buyerPage.goto(orderUrl);
  await buyerPage.getByRole("button", { name: "Teklifi kabul et" }).click();
  await expect(buyerPage.getByText("Aktif").first()).toBeVisible();

  await sellerPage.reload();
  await sellerPage.getByRole("button", { name: "Teslim et" }).click();
  await sellerPage.getByLabel("Teslimat notu").fill("Panel hazır, kurulum adımları ektedir.");
  await sellerPage.getByRole("dialog").getByRole("button", { name: "Teslim Et" }).click();
  await expect(sellerPage.getByText("Teslim edildi").first()).toBeVisible();

  await buyerPage.reload();
  await expect(buyerPage.getByText("Panel hazır, kurulum adımları ektedir.").first()).toBeVisible();
  await buyerPage.getByRole("button", { name: "Siparişi onayla" }).click();
  await expect(buyerPage.getByText("Tamamlandı").first()).toBeVisible();

  await buyerPage.getByLabel("Yorumun").fill("Harika bir iş çıkardı!");
  await buyerPage.getByRole("button", { name: "Değerlendir" }).click();
  await expect(buyerPage.getByText("Bu sipariş değerlendirildi. Teşekkürler!")).toBeVisible();

  await sellerPage.goto("/profilim");
  await expect(sellerPage.getByText("Harika bir iş çıkardı!")).toBeVisible();
});
