import { describe, expect, it } from "vitest";

import { EnvValidationError, parseEnv } from "../config/env.js";

const validEnv = {
  MONGO_URI: "mongodb://localhost:27017/workist",
  JWT_ACCESS_SECRET: "a".repeat(32),
  CLIENT_URL: "http://localhost:3000",
};

describe("parseEnv", () => {
  it("applies defaults for optional values", () => {
    const env = parseEnv(validEnv);

    expect(env.PORT).toBe(4000);
    expect(env.NODE_ENV).toBe("development");
    expect(env.CLIENT_URL).toEqual(["http://localhost:3000"]);
  });

  it("splits a comma separated client url list", () => {
    const env = parseEnv({ ...validEnv, CLIENT_URL: "http://a.test, https://b.test" });

    expect(env.CLIENT_URL).toEqual(["http://a.test", "https://b.test"]);
  });

  it("names every missing variable in the error", () => {
    expect(() => parseEnv({})).toThrowError(EnvValidationError);

    try {
      parseEnv({});
    } catch (error) {
      expect(error.message).toContain("MONGO_URI");
      expect(error.message).toContain("JWT_ACCESS_SECRET");
      expect(error.message).toContain("CLIENT_URL");
    }
  });

  it("rejects a short jwt secret", () => {
    expect(() => parseEnv({ ...validEnv, JWT_ACCESS_SECRET: "short" })).toThrowError(
      /JWT_ACCESS_SECRET/,
    );
  });
});

describe("storage configuration", () => {
  it("requires bucket settings for the s3 driver", () => {
    expect(() => parseEnv({ ...validEnv, STORAGE_DRIVER: "s3" })).toThrowError(/S3_BUCKET/);
  });

  it("defaults secure cookies to production only", () => {
    expect(parseEnv(validEnv).COOKIE_SECURE).toBe(false);
    expect(parseEnv({ ...validEnv, NODE_ENV: "production" }).COOKIE_SECURE).toBe(true);
  });
});

describe("blank values", () => {
  it("treats empty strings as missing so the example file works as is", () => {
    const env = parseEnv({ ...validEnv, S3_ENDPOINT: "", COOKIE_DOMAIN: "", PORT: "" });

    expect(env.S3_ENDPOINT).toBeUndefined();
    expect(env.PORT).toBe(4000);
  });
});
