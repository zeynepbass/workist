import { describe, expect, it } from "vitest";

import { toFormData } from "./apiClient";

describe("toFormData", () => {
  it("serializes objects as JSON, skips empty values and appends files", () => {
    const image = new File(["x"], "a.png", { type: "image/png" });
    const formData = toFormData(
      { title: "Başlık", price: 200, addons: { logo: true }, note: undefined },
      { image, files: [image, image] },
    );

    expect(formData.get("title")).toBe("Başlık");
    expect(formData.get("price")).toBe("200");
    expect(JSON.parse(formData.get("addons"))).toEqual({ logo: true });
    expect(formData.has("note")).toBe(false);
    expect(formData.get("image")).toBe(image);
    expect(formData.getAll("files")).toHaveLength(2);
  });
});
