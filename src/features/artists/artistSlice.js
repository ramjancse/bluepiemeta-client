import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    searched(state, action) {
      state.keyword = action.payload.keyword;
    },
  },
});

export const { searched } = artistSlice.actions;
export default artistSlice.reducer;
