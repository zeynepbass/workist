const { createProxyMiddleware } = require("http-proxy-middleware");

const target = process.env.API_PROXY_TARGET || "http://localhost:4000";
const PROXIED_PATHS = ["/api", "/uploads", "/socket.io", "/health"];

module.exports = function setupProxy(app) {
  app.use(
    createProxyMiddleware(PROXIED_PATHS, {
      target,
      changeOrigin: true,
      ws: true,
    }),
  );
};
