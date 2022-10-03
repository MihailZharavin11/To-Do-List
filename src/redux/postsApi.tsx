import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
    addPosts: builder.mutation({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostsMutation } = postsApi;
