import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET ??= "test-secret-that-is-long-enough-for-validation";
process.env.CLIENT_URL ??= "http://localhost:3000";
process.env.MONGO_URI ??= "mongodb://127.0.0.1:27017/workist-test";

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
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await mongoServer?.stop();
});
