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
    deleteAlbum: builder.mutation({
      query: (albumId) => ({
        url: `/albums/${albumId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAlbums", undefined, (draft) => {
              const updatedData = draft.data.filter(
                (album) => album.id !== arg
              );

              const data = { ...draft, data: updatedData };
              return data;
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumAPI;
