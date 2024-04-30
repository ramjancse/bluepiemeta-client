import { apiSlice } from "../api/apiSlice";

export const albumAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: "/register",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: "/login",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    getAlbums: builder.query({
      query: (page) => `/albums`,
    }),
  }),
});

export const { useGetAlbumsQuery } = albumAPI;
