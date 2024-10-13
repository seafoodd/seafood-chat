import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token || localStorage.getItem("token");
  //   if (token) {
  //     headers.set("Authorizaion", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});