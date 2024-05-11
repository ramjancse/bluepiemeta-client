import albumSliceReducer from "@/features/albums/albumSlice";
import { apiSlice } from "@/features/api/apiSlice";
import artistSliceReducer from "@/features/artists/artistSlice";
import authSliceReducer from "@/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "features/api/apiSlice";
// import authReducer from "features/auth/authSlice";
// import coursePlayerReducer from "features/student/course-player/coursePlayerSlice";
// import quizReducer from "features/student/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    album: albumSliceReducer,
    artist: artistSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
