import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releasePrimaryArtist: null,
  editTrackData: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    selectAlbumArtist: (state, action) => {
      state.releasePrimaryArtist = action.payload.artist;
    },
    setEditTrack: (state, action) => {
      state.editTrackData = action.payload.track;
    },
  },
});

export const { selectAlbumArtist, setEditTrack } = albumSlice.actions;
export default albumSlice.reducer;
