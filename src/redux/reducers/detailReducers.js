import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: null,
  // isLoading: false,
  // seriesID: null,
};

const DetailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload;
      console.log("action", action);
    },
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    // setSeriesID: (state, action) => {
    //   state.seriesID = action.payload;
    // },
  },
});

export const { setDetail } = DetailSlice.actions;
export default DetailSlice.reducer;
