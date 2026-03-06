// const BASE_URL = "/api"; // nginx проксі автоматично

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   if (!res.ok) throw new Error("Registration failed");
//   return res.json();
// };

// export const loginUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   if (!res.ok) throw new Error("Login failed");
//   return res.json();
// };
import { apiFetch } from "./apiClient";
export const registerUser = async (userData) => {
  const res = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return res;
};

export const loginUser = async (userData) => {
  const res = await apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return res;
};