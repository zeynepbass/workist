import { mkdtempSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";

const serverDir = path.resolve(import.meta.dirname, "../../server");
const requireFromServer = createRequire(path.join(serverDir, "package.json"));
const { MongoMemoryServer } = requireFromServer("mongodb-memory-server");

const mongo = await MongoMemoryServer.create();

Object.assign(process.env, {
  NODE_ENV: "production",
  PORT: process.env.E2E_API_PORT ?? "4100",
  MONGO_URI: mongo.getUri("workist-e2e"),
  JWT_ACCESS_SECRET: "e2e-access-secret-that-is-long-enough",
  CLIENT_URL: process.env.E2E_CLIENT_URL ?? "http://localhost:3100",
  COOKIE_SECURE: "false",
  STORAGE_DRIVER: "local",
  UPLOAD_DIR: mkdtempSync(path.join(tmpdir(), "workist-e2e-")),
  LOG_LEVEL: "warn",
});

process.on("SIGTERM", async () => {
  await mongo.stop();
  process.exit(0);
});

await import(path.join(serverDir, "index.js"));
