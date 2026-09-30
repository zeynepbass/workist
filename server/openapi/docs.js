import swaggerUi from "swagger-ui-express";

import { buildOpenApiDocument } from "./document.js";

export function mountApiDocs(app) {
  const document = buildOpenApiDocument();

  app.get("/api/docs/openapi.json", (req, res) => res.json(document));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(document));
}
