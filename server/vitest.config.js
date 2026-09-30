import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.js"],
    hookTimeout: 120000,
    testTimeout: 30000,
    fileParallelism: false,
  },
});
