import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
};

const PeopleSlicer = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
      // console.log("state", state);
      // console.log("action", action);
    },
  },
});

export const { setPeople } = PeopleSlicer.actions;
export default PeopleSlicer.reducer;
