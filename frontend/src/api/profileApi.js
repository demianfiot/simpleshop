import { apiFetch } from "./apiClient";

export const getProfile = () => apiFetch("/profile");

export const updateProfile = (data) =>
  apiFetch("/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
