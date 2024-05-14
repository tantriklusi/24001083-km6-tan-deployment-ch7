import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  angka: 0,
};

const counterSlicer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAngka: (state, action) => {
      if (action.payload.operasi === "tambah") {
        state.angka = state.angka + action.payload.jumlah;
      }
      if (action.payload.operasi === "kurang") {
        state.angka = state.angka - action.payload.jumlah;
      }
    },
    tambahAngka: (state) => {
      state.angka = state.angka + 1;
    },
    kurangAngka: (state) => {
      state.angka = state.angka - 1;
    },
  },
});

export const { setAngka, tambahAngka, kurangAngka } = counterSlicer.actions;

export default counterSlicer.reducer;
