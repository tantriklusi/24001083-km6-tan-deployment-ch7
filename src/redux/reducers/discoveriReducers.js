// reducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discoveri: [],
};

const DicoveriSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setDiscoveri: (state, action) => {
      state.discoveri = action.payload;
    },
  },
});

export const { setDiscoveri } = DicoveriSlice.actions;
export default DicoveriSlice.reducer;
