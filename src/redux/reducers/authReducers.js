// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: localStorage.getItem("token") || null,
//   isLoggedIn: !!localStorage.getItem("token"),
//   user: null,
// };
// const authSlicer = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       if (action.payload) {
//         localStorage.setItem("token", action.payload);
//       } else {
//         localStorage.removeItem("token");
//       }

//       state.token = action.payload;
//     },
//     setIsLoggedIn: (state, action) => {
//       state.isLoggedIn = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });
// export const { setIsLoggedIn, setToken, setUser } = authSlicer.actions;

// export default authSlicer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  password: "",
  showPassword: false,
  user: null,
  error: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setEmail, setPassword, setShowPassword, setUser, setError, clearError, setIsLoggedIn, setName, setToken } = authSlice.actions;

export default authSlice.reducer;
