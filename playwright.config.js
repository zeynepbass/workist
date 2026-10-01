import { defineConfig, devices } from "@playwright/test";

const CLIENT_PORT = Number(process.env.E2E_CLIENT_PORT ?? 3456);
const API_PORT = Number(process.env.E2E_API_PORT ?? 4456);

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${CLIENT_PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node e2e/support/start-server.mjs",
      url: `http://localhost:${API_PORT}/health`,
      env: { E2E_API_PORT: String(API_PORT), E2E_CLIENT_URL: `http://localhost:${CLIENT_PORT}` },
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command: "npm start --prefix client",
      url: `http://localhost:${CLIENT_PORT}`,
      env: {
        PORT: String(CLIENT_PORT),
        BROWSER: "none",
        API_PROXY_TARGET: `http://localhost:${API_PORT}`,
      },
      reuseExistingServer: false,
      timeout: 240_000,
    },
  ],
});
