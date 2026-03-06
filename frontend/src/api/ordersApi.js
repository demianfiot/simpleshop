import { apiFetch } from "./apiClient";

export const createOrder = (items) =>
  apiFetch("/orders/", {
    method: "POST",
    body: JSON.stringify({ items }),
  });

export const getMyOrders = () =>
  apiFetch("/orders/");