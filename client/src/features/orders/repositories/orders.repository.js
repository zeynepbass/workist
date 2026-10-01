import { toFormData } from "@/shared/api";
import { toPage } from "@/shared/api/pagination";
import { orderAdapter, reviewAdapter } from "../adapters/order.adapter";
import { ordersApi } from "../api/orders.api";

const ACTION_PATHS = {
  offer: "offer",
  accept: "accept",
  deliver: "deliver",
  request_revision: "request-revision",
  complete: "complete",
  cancel: "cancel",
};

export async function listOrders({ role, status }, cursor) {
  return toPage(await ordersApi.list({ role, status, cursor }), orderAdapter);
}

export async function getOrder(id) {
  const { data } = await ordersApi.get(id);
  return orderAdapter(data.data);
}

export async function createOrder(body) {
  const { data } = await ordersApi.create(body);
  return orderAdapter(data.data);
}

export async function performAction(id, action, { files, ...payload } = {}) {
  const body = action === "deliver" ? toFormData(payload, { files }) : payload;
  const { data } = await ordersApi.act(id, ACTION_PATHS[action], body);
  return orderAdapter(data.data);
}

export async function downloadFile(orderId, file) {
  const { data } = await ordersApi.downloadFile(orderId, file.id);
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
}

export async function reviewOrder(id, body) {
  const { data } = await ordersApi.review(id, body);
  return reviewAdapter(data.data);
}

export async function listReviews(filters, cursor) {
  return toPage(await ordersApi.listReviews({ ...filters, cursor }), reviewAdapter);
}
