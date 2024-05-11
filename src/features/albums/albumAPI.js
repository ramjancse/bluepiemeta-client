import { apiSlice } from "../api/apiSlice";

export const albumAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: ({ page, keyword }) => {
        const encoded = encodeURI(keyword);
        return {
          url: `/albums?search=${encoded}&page=${page}`,
        };
      },
      transformResponse: (response) => {
        const filteredData = response.data.filter(
          (album) => album.albumStatus !== "Deleted"
        );

        const updatedData = { ...response, data: filteredData };
        return updatedData;
      },
    }),
    getAlbum: builder.query({
      query: (albumId) => `/albums/${albumId}`,
    }),
    addAlbum: builder.mutation({
      query: (data) => ({
        url: `/albums`,
        method: "POST",
        body: data,
      }),
    }),
    editAlbum: builder.mutation({
      query: ({ albumId, data }) => ({
        url: `/albums/${albumId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAlbum: builder.mutation({
      query: ({ albumId, data }) => ({
        url: `/albums/${albumId}`,
        method: "PUT",
        body: {
          ...data,
          albumStatus: "Deleted",
        },
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     await queryFulfilled;

      //     dispatch(
      //       apiSlice.util.updateQueryData("getAlbums", undefined, (draft) => {
      //         const updatedData = draft.data.filter(
      //           (album) => album.id !== arg
      //         );

      //         const data = { ...draft, data: updatedData };
      //         return data;
      //       })
      //     );
      //   } catch (error) {}
      // },
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useGetAlbumQuery,
  useAddAlbumMutation,
  useEditAlbumMutation,
  useDeleteAlbumMutation,
} = albumAPI;
