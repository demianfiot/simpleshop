import { apiFetch } from "./apiClient";

export const getProducts = () =>
  apiFetch("/products");

export const createProduct = (product) =>
  apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

export const updateProduct = (id, product) =>
  apiFetch(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
