import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "",
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/v1",    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from your store or local storage
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
