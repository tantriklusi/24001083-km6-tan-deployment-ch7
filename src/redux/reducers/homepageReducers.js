import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trending: [],
  discoveri: [],
  onair: [],
  currentMovieIndex: 0,
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setTrending(state, action) {
      state.trending = action.payload;
    },
    setDiscoveri(state, action) {
      state.discoveri = action.payload;
    },
    setOnair(state, action) {
      state.onair = action.payload;
    },
    setCurrentMovieIndex(state, action) {
      state.currentMovieIndex = action.payload;
    },
  },
});

export const { setTrending, setDiscoveri, setOnair, setCurrentMovieIndex } = homepageSlice.actions;
export default homepageSlice.reducer;
