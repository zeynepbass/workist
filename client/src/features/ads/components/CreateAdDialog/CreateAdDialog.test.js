import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import { adFixture, renderWithProviders } from "@/test/renderWithProviders";
import { server } from "@/test/server";

import CreateAdDialog from "./CreateAdDialog";

const { createAd } = vi.hoisted(() => ({ createAd: vi.fn() }));

vi.mock("../../repositories/ads.repository", () => ({ createAd }));

const CATEGORIES = [
  {
    slug: "software-technology",
    label: "Yazılım & Teknoloji",
    subcategories: [{ slug: "web-application", label: "Web Uygulaması" }],
  },
];

describe("CreateAdDialog", () => {
  it("walks through category selection and submits fields with the total price", async () => {
    createAd.mockResolvedValue(adFixture());
    server.use(http.get("/api/categories", () => HttpResponse.json({ data: CATEGORIES })));

    renderWithProviders(<CreateAdDialog />);
    await userEvent.click(screen.getByRole("button", { name: "Yeni İş İlanı Ekle" }));
    await userEvent.click(await screen.findByRole("button", { name: /Yazılım & Teknoloji/ }));
    await userEvent.click(screen.getByRole("button", { name: "Web Uygulaması" }));
    await userEvent.click(screen.getByRole("button", { name: "Devam Et" }));

    await userEvent.selectOptions(screen.getByLabelText("Hizmet türü"), "Admin Panel");
    await userEvent.type(screen.getByLabelText("Başlık"), "admin paneli yaparım");
    await userEvent.type(screen.getByLabelText("Teslim süresi"), "3 gün");
    await userEvent.type(screen.getByLabelText("Açıklama"), "Yönetim paneli hazırlıyorum.");
    await userEvent.click(screen.getByLabelText(/^Logo/));
    await userEvent.click(screen.getByRole("button", { name: "Kaydet" }));

    expect(await screen.findByText("İlan görseli zorunludur.")).toBeInTheDocument();
    expect(createAd).not.toHaveBeenCalled();

    const image = new File(["png"], "ad.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText("İlan görseli"), image);
    await userEvent.click(screen.getByRole("button", { name: "Kaydet" }));

    await waitFor(() => expect(createAd).toHaveBeenCalledTimes(1));
    const [{ fields, image: sentImage }] = createAd.mock.calls[0];
    expect(fields).toMatchObject({
      title: "Ben, admin paneli yaparım",
      price: 200,
      category: "software-technology",
      subcategory: "web-application",
      addons: { logo: true, sourceCode: false, backgroundMusic: false },
    });
    expect(fields).not.toHaveProperty("owner");
    expect(sentImage).toBe(image);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("rejects unsupported image types before upload", async () => {
    server.use(http.get("/api/categories", () => HttpResponse.json({ data: CATEGORIES })));

    renderWithProviders(<CreateAdDialog />);
    await userEvent.click(screen.getByRole("button", { name: "Yeni İş İlanı Ekle" }));
    await userEvent.click(await screen.findByRole("button", { name: /Yazılım & Teknoloji/ }));
    await userEvent.click(screen.getByRole("button", { name: "Web Uygulaması" }));
    await userEvent.click(screen.getByRole("button", { name: "Devam Et" }));

    const gif = new File(["gif"], "a.gif", { type: "image/gif" });
    await userEvent.upload(screen.getByLabelText("İlan görseli"), gif, { applyAccept: false });

    expect(
      await screen.findByText("Yalnızca JPG, PNG veya WEBP yükleyebilirsiniz."),
    ).toBeInTheDocument();
  });
});
