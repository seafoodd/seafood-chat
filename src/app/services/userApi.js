import { api } from "./api.js";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/id/${id}`,
        method: "GET",
      }),
    }),
    getUserByUsername: builder.query({
      query: (username) => ({
        url: `/users/username/${username}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/users/update",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUserByUsernameQuery,
  useLazyGetUserByUsernameQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: {
    login,
    register,
    current,
    getUserById,
    getUserByUsername,
    updateUser,
  },
} = userApi;
