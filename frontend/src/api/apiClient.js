const BASE_URL = "/api";

export const apiFetch = async (url, options = {}) => {
  console.log("BASE:", BASE_URL);
  console.log("URL ARG:", url);
  console.log("FINAL:", `${BASE_URL}${url}`);
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");

    window.location.href = "/auth";
    return;
  }

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};
