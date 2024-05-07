import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releasePrimaryArtist: [],
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    // userLoggedIn: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.user = action.payload.user;
    // },
    // userLoggedOut: (state) => {
    //   state.accessToken = undefined;
    //   state.user = undefined;
    //   localStorage.clear();
    // },
    selectAlbumArtist: (state, action) => {
      state.releasePrimaryArtist = action.payload.artist;
    },
  },
});

export const { selectAlbumArtist } = albumSlice.actions;
export default albumSlice.reducer;
