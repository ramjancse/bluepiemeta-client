import { apiSlice } from "../api/apiSlice";

export const albumAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => `/albums`,
    }),
  }),
});

export const { useGetAlbumsQuery } = albumAPI;
