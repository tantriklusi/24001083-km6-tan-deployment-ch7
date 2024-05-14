import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OnAir: [],
  currentSlide: 0,
  data: [],
};

const OnAirSlice = createSlice({
  name: "onair",
  initialState,
  reducers: {
    setOnAir: (state, action) => {
      state.OnAir = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
  },
});

export const { setOnAir, setCurrentSlide, setData } = OnAirSlice.actions;
export default OnAirSlice.reducer;
