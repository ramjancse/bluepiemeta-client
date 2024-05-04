import { apiSlice } from "../api/apiSlice";

export const artistAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => `/artists`,
    }),
    addArtist: builder.mutation({
      query: (data) => ({
        url: `/artists`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetArtistsQuery } = artistAPI;
