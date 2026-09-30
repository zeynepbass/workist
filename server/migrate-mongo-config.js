import dotenv from "dotenv";

dotenv.config({ quiet: true });

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is required to run migrations");
}

export default {
  mongodb: { url: process.env.MONGO_URI },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "esm",
};
