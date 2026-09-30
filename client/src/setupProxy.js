const { createProxyMiddleware } = require("http-proxy-middleware");

const target = process.env.API_PROXY_TARGET || "http://localhost:4000";

const API_PATHS = [
  "/api",
  "/me",
  "/signin",
  "/uye-ol",
  "/users",
  "/duzenle",
  "/ilanlar",
  "/ilanlarim",
  "/portfolyo",
  "/mesajlar",
  "/konusmalar",
  "/socket.io",
];

const isApiRequest = (pathname, req) =>
  API_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`)) &&
  !(req.headers.accept || "").includes("text/html");

const isConversationDelete = (pathname, req) =>
  req.method === "DELETE" && /^\/[0-9a-f]{24}\/[0-9a-f]{24}$/.test(pathname);

module.exports = function setupProxy(app) {
  app.use(
    createProxyMiddleware(
      (pathname, req) => isApiRequest(pathname, req) || isConversationDelete(pathname, req),
      { target, changeOrigin: true, ws: true },
    ),
  );
};
