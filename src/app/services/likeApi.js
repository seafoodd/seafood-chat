import { api } from "./api.js";

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation({
      query: (id) => ({
        url: `/likes/${id}`,
        method: "POST",
      }),
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/likes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;

export const {
  endpoints: { likePost, unlikePost },
} = likeApi;
