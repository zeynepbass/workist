import { z } from "zod";

import { createAdBody, listAdsQuery, updateAdBody } from "../validators/ad.validators.js";
import { loginBody, registerBody } from "../validators/auth.validators.js";
import { idParams } from "../validators/common.js";
import { listMessagesQuery, partnerParams } from "../validators/message.validators.js";
import {
  createOrderBody,
  deliverBody,
  listOrdersQuery,
  listReviewsQuery,
  noteBody,
  offerBody,
  orderFileParams,
  reviewBody,
} from "../validators/order.validators.js";
import {
  createPortfolioBody,
  listPortfoliosQuery,
  updatePortfolioBody,
} from "../validators/portfolio.validators.js";
import {
  changePasswordBody,
  deleteAccountBody,
  updateProfileBody,
} from "../validators/user.validators.js";

const toSchema = (schema) => z.toJSONSchema(schema, { io: "input", unrepresentable: "any" });

function parametersFrom(schema, location) {
  const { properties = {}, required = [] } = toSchema(schema);

  return Object.entries(properties).map(([name, property]) => ({
    name,
    in: location,
    required: location === "path" || required.includes(name),
    schema: property,
  }));
}

function operation({ summary, tag, params, query, body, multipart, auth = true, success = 200 }) {
  const parameters = [
    ...(params ? parametersFrom(params, "path") : []),
    ...(query ? parametersFrom(query, "query") : []),
  ];

  const bodySchema = body ? toSchema(body) : null;

  if (multipart && bodySchema) {
    bodySchema.properties = {
      ...bodySchema.properties,
      [multipart]: { type: "string", format: "binary" },
    };
  }

  return {
    summary,
    tags: [tag],
    ...(auth ? { security: [{ bearerAuth: [] }] } : {}),
    ...(parameters.length ? { parameters } : {}),
    ...(bodySchema
      ? {
          requestBody: {
            required: true,
            content: { [multipart ? "multipart/form-data" : "application/json"]: { schema: bodySchema } },
          },
        }
      : {}),
    responses: {
      [success]: { description: "Başarılı" },
      400: { $ref: "#/components/responses/Error" },
      401: { $ref: "#/components/responses/Error" },
      403: { $ref: "#/components/responses/Error" },
      404: { $ref: "#/components/responses/Error" },
    },
  };
}

const orderAction = (name, body = noteBody) => ({
  post: operation({ summary: `Sipariş: ${name}`, tag: "Orders", params: idParams, body }),
});

export function buildOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: { title: "Workist API", version: "1.0.0" },
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
      responses: {
        Error: {
          description: "Hata",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      message: { type: "string" },
                      details: { type: "array", items: { type: "object" } },
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/health": { get: operation({ summary: "Sağlık kontrolü", tag: "Meta", auth: false }) },
      "/api/categories": { get: operation({ summary: "Kategoriler", tag: "Meta", auth: false }) },
      "/api/auth/register": {
        post: operation({ summary: "Kayıt", tag: "Auth", body: registerBody, auth: false, success: 201 }),
      },
      "/api/auth/login": {
        post: operation({ summary: "Giriş", tag: "Auth", body: loginBody, auth: false }),
      },
      "/api/auth/refresh": {
        post: operation({ summary: "Access token yenileme (cookie)", tag: "Auth", auth: false }),
      },
      "/api/auth/logout": {
        post: operation({ summary: "Çıkış", tag: "Auth", auth: false, success: 204 }),
      },
      "/api/users/me": {
        get: operation({ summary: "Oturumdaki kullanıcı", tag: "Users" }),
        patch: operation({ summary: "Profil güncelle", tag: "Users", body: updateProfileBody }),
        delete: operation({ summary: "Hesabı sil", tag: "Users", body: deleteAccountBody, success: 204 }),
      },
      "/api/users/me/avatar": {
        put: operation({ summary: "Profil fotoğrafı", tag: "Users", body: z.object({}), multipart: "avatar" }),
      },
      "/api/users/me/password": {
        patch: operation({ summary: "Parola değiştir", tag: "Users", body: changePasswordBody, success: 204 }),
      },
      "/api/users/{id}": {
        get: operation({ summary: "Herkese açık profil", tag: "Users", params: idParams }),
      },
      "/api/ads": {
        get: operation({ summary: "İlan listesi", tag: "Ads", query: listAdsQuery }),
        post: operation({ summary: "İlan oluştur", tag: "Ads", body: createAdBody, multipart: "image", success: 201 }),
      },
      "/api/ads/{id}": {
        get: operation({ summary: "İlan detayı", tag: "Ads", params: idParams }),
        patch: operation({ summary: "İlan güncelle", tag: "Ads", params: idParams, body: updateAdBody, multipart: "image" }),
        delete: operation({ summary: "İlan sil", tag: "Ads", params: idParams, success: 204 }),
      },
      "/api/portfolios": {
        get: operation({ summary: "Portfolyo listesi", tag: "Portfolios", query: listPortfoliosQuery }),
        post: operation({ summary: "Portfolyo oluştur", tag: "Portfolios", body: createPortfolioBody, multipart: "image", success: 201 }),
      },
      "/api/portfolios/{id}": {
        get: operation({ summary: "Portfolyo detayı", tag: "Portfolios", params: idParams }),
        patch: operation({ summary: "Portfolyo güncelle", tag: "Portfolios", params: idParams, body: updatePortfolioBody, multipart: "image" }),
        delete: operation({ summary: "Portfolyo sil", tag: "Portfolios", params: idParams, success: 204 }),
      },
      "/api/conversations": {
        get: operation({ summary: "Konuşmalar", tag: "Messages" }),
      },
      "/api/conversations/{partnerId}": {
        delete: operation({ summary: "Konuşmayı sil", tag: "Messages", params: partnerParams, success: 204 }),
      },
      "/api/conversations/{partnerId}/messages": {
        get: operation({ summary: "Mesajlar", tag: "Messages", params: partnerParams, query: listMessagesQuery }),
      },
      "/api/orders": {
        get: operation({ summary: "Siparişler", tag: "Orders", query: listOrdersQuery }),
        post: operation({ summary: "Sipariş talebi oluştur", tag: "Orders", body: createOrderBody, success: 201 }),
      },
      "/api/orders/{id}": {
        get: operation({ summary: "Sipariş detayı", tag: "Orders", params: idParams }),
      },
      "/api/orders/{id}/offer": orderAction("offer", offerBody),
      "/api/orders/{id}/accept": orderAction("accept"),
      "/api/orders/{id}/deliver": {
        post: operation({ summary: "Sipariş: deliver", tag: "Orders", params: idParams, body: deliverBody, multipart: "files" }),
      },
      "/api/orders/{id}/request-revision": orderAction("request_revision"),
      "/api/orders/{id}/complete": orderAction("complete"),
      "/api/orders/{id}/cancel": orderAction("cancel"),
      "/api/orders/{id}/files/{fileId}": {
        get: operation({ summary: "Teslimat dosyası indir", tag: "Orders", params: orderFileParams }),
      },
      "/api/orders/{id}/review": {
        post: operation({ summary: "Siparişi değerlendir", tag: "Orders", params: idParams, body: reviewBody, success: 201 }),
      },
      "/api/reviews": {
        get: operation({ summary: "Değerlendirmeler", tag: "Reviews", query: listReviewsQuery }),
      },
    },
  };
}
