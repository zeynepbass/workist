import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export async function setup() {
  if (process.env.MONGO_TEST_URI) {
    return;
  }

  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_TEST_URI = mongoServer.getUri();
}

export async function teardown() {
  await mongoServer?.stop();
}
