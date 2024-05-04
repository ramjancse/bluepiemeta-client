import { apiSlice } from "../api/apiSlice";

export const albumAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => `/albums`,
    }),
    addAlbum: builder.mutation({
      query: (data) => ({
        url: `/albums`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAlbumsQuery, useAddAlbumMutation } = albumAPI;
