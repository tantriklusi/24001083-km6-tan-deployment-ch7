// -kodingan 3 (redux)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trending: [],
  notfound: false,
  searchResults: [], // Tambahkan state pencarian
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setNotFound: (state, action) => {
      state.notfound = action.payload;
    },
    setSearchResults: (state, action) => {
      // Tambahkan reducer untuk hasil pencarian
      state.searchResults = action.payload;
    },
  },
});

export const { setTrending, setNotFound, setSearchResults } = tvSlice.actions;
export default tvSlice.reducer;
