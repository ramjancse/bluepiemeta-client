import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releasePrimaryArtist: [],
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    selectAlbumArtist: (state, action) => {
      state.releasePrimaryArtist = action.payload.artist;
    },
  },
});

export const { selectAlbumArtist } = albumSlice.actions;
export default albumSlice.reducer;
