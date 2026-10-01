import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globalSetup: ["./tests/globalSetup.js"],
    setupFiles: ["./tests/setup.js"],
    hookTimeout: 120000,
    testTimeout: 30000,
    fileParallelism: false,
    coverage: {
      provider: "v8",
      include: ["services/**", "controllers/**", "middleware/**", "sockets/**", "utils/**"],
      reporter: ["text-summary", "text"],
      thresholds: {
        "services/**": { lines: 80, functions: 80, branches: 70, statements: 80 },
      },
    },
  },
});
