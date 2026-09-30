import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";

const uploadDir = mkdtempSync(path.join(tmpdir(), "workist-uploads-"));

process.env.NODE_ENV = "test";
process.env.JWT_ACCESS_SECRET = "test-access-secret-that-is-long-enough";
process.env.CLIENT_URL = "http://localhost:3000";
process.env.MONGO_URI = "mongodb://127.0.0.1:27017/workist-test";
process.env.STORAGE_DRIVER = "local";
process.env.UPLOAD_DIR = uploadDir;
process.env.LOG_LEVEL = "silent";

let mongoServer;

async function resolveTestDatabaseUri() {
  if (process.env.MONGO_TEST_URI) {
    return process.env.MONGO_TEST_URI;
  }

  mongoServer = await MongoMemoryServer.create();
  return mongoServer.getUri();
}

beforeAll(async () => {
  await mongoose.connect(await resolveTestDatabaseUri());
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await mongoServer?.stop();
  rmSync(uploadDir, { recursive: true, force: true });
});
