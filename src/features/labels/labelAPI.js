import { apiSlice } from "../api/apiSlice";

export const labelAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabels: builder.query({
      query: () => `/labels`,
    }),
    addLabel: builder.mutation({
      query: (data) => ({
        url: "/labels",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetLabelsQuery, useAddLabelMutation } = labelAPI;
