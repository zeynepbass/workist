import { describe, expect, it } from "vitest";

import { EnvValidationError, parseEnv } from "../config/env.js";

const validEnv = {
  MONGO_URI: "mongodb://localhost:27017/workist",
  JWT_SECRET: "a".repeat(32),
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
      expect(error.message).toContain("JWT_SECRET");
      expect(error.message).toContain("CLIENT_URL");
    }
  });

  it("rejects a short jwt secret", () => {
    expect(() => parseEnv({ ...validEnv, JWT_SECRET: "short" })).toThrowError(/JWT_SECRET/);
  });
});
