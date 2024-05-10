import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releasePrimaryArtist: null,
  editTrackData: null,
  albums: [],
  keyword: "",
  page: 1,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbumArtist: (state, action) => {
      state.releasePrimaryArtist = action.payload.artist;
    },
    setEditTrack: (state, action) => {
      state.editTrackData = action.payload.track;
    },
    searched(state, action) {
      state.keyword = action.payload.keyword;
    },
  },
});

export const { setAlbumArtist, setEditTrack, searched } = albumSlice.actions;
export default albumSlice.reducer;
