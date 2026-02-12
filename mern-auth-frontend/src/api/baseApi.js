import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const csrfToken = getCookie("csrfToken");
    if (csrfToken) {
      headers.set("x-csrf-token", csrfToken);
    }
    return headers;
  },
});