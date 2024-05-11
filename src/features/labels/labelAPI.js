import { apiSlice } from "../api/apiSlice";

export const labelAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabels: builder.query({
      query: () => `/labels`,
    }),
  }),
});

export const { useGetLabelsQuery } = labelAPI;
