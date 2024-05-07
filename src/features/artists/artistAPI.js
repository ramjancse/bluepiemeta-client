import { apiSlice } from "../api/apiSlice";

export const artistAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => `/artists`,
      providesTags: ["Artists"],
    }),
    addArtist: builder.mutation({
      query: (data) => ({
        url: `/artists`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getArtists", undefined, (draft) => {
              draft.push(arg);
            })
          );
        } catch (error) {}
      },
    }),
    editArtist: builder.mutation({
      query: ({ artistId, data }) => ({
        url: `/artists/${artistId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Artists"],
      // async onQueryStarted({ artistId }, { queryFulfilled, dispatch }) {
      //   try {
      //     const data = await queryFulfilled;
      //     console.log(data, "edit result data");

      //     dispatch(
      //       apiSlice.util.updateQueryData("getArtists", undefined, (draft) => {
      //         console.log(JSON.parse(JSON.stringify(draft)), "parsed data");

      //         // const artist = draft.data.find(
      //         //   (artist) => artist.id === artistId.toString()
      //         // );

      //         // // artist.name = data.name;
      //         // artist.fullName = data.fullName;
      //         // // artist.sex = data.sex;
      //         // artist.areaCode = data.areaCode;
      //         // // artist.phoneNumber = data.phoneNumber;
      //         // artist.address = data.address;
      //         // // artist.region = data.region;
      //         // artist.artistImage = data.artistImage;
      //         // artist.artistType = data.artistType;
      //         // artist.artistLinks = data.artistLinks;
      //         // // artist.socialMedia = data.socialMedia;

      //         return draft;
      //       })
      //     );
      //   } catch (error) {
      //     console.log(error, "error in ");
      //   }
      // },
    }),
    deleteArtist: builder.mutation({
      query: (artistId) => ({
        url: `/artists/${artistId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getArtists", undefined, (draft) => {
              console.log(
                JSON.parse(JSON.stringify(draft), "deleteArtist draft")
              );

              // const updatedData = draft.data.filter(
              //   (artist) => artist.id !== arg
              // );

              // const data = { ...draft, data: updatedData };
              return draft;
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useAddArtistMutation,
  useEditArtistMutation,
  useDeleteArtistMutation,
} = artistAPI;
