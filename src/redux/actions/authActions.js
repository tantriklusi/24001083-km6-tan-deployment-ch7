// import axios from "axios";
// import { setIsLoggedIn, setToken } from "../reducers/authReducers";

// export const loginUser = (data, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`https://shy-cloud-3319.fly.dev/api/v1/auth/login`, data, { "Content-Type": "application/json" });
//     const { token } = response?.data?.data;

//     dispatch(setToken(token));
//     dispatch(setIsLoggedIn(true));
//     return response;
//     navigate("/");
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error?.response?.data?.message);
//       return;
//     }
//     console.error(error.message);
//   }
// };

// export const register = (data, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`https://shy-cloud-3319.fly.dev/api/v1/auth/register`, data, { "Content-Type": "application/json" });
//     const { token } = response?.data?.data;

//     dispatch(setToken(token));
//     dispatch(setIsLoggedIn(true));
//     navigate("/login");
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error?.response?.data?.message);
//       return;
//     }
//     console.error(error.message);
//   }
// };

// export const registerLoginWithGoogleAction = (accessToken, navigate) => async (dispatch) => {
//   // Mengirim permintaan untuk login dengan Google ke server
//   try {
//     const response = await axios.post("https://shy-cloud-3319.fly.dev/api/v1/auth/google", { access_token: accessToken }, { headers: { "Content-Type": "application/json" } });
//     // Mendapatkan token dari respons
//     const { token } = response.data.data;
//     // Menyimpan token ke dalam store Redux menggunakan action creator setToken
//     dispatch(setToken(token));
//     // Mengarahkan pengguna ke halaman utama
//     navigate("/");
//     // Menangani kesalahan jika permintaan gagal
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       alert(error.message);
//       return;
//     }
//     console.error("Error registering/login with Google:", error);
//     alert(error.message);
//   }
// };

import axios from "axios";
import { setUser, setError, clearError } from "../reducers/authReducers";

//Login
export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const responseLogin = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (responseLogin.status === 200) {
      dispatch(setUser(responseLogin.data)); // Mengatur setUser ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
      localStorage.setItem("token", responseLogin.data.data.token); // Menyimpan token user di local storage
      console.log("Data: ", responseLogin.data); // Menampilkan data responseLogin di konsol
      navigate("/");
      alert(`Login successful, enjoy watching!`);
    }
    console.log("Response Login: ", responseLogin);
  } catch (error) {
    console.log(error);
    dispatch(setError("Invalid username or password! Please try again."));
    alert("Invalid username or password! Please try again.");
  }
};

//register
export const registerUser = (email, name, password, navigate) => async (dispatch) => {
  try {
    const responseRegister = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      {
        email: email,
        name: name,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (responseRegister.status === 201) {
      dispatch(clearError()); // Menghapus error ke Reducers
      localStorage.setItem("token", responseRegister.data.data.token); // Menyimpan token pengguna di local storage
      console.log("Data: ", responseRegister.data); // Menampilkan data response di konsol
      alert("Registration successful! Please login to continue.");
      navigate("/login");
    }
    console.log("Response Register", responseRegister); // Menampilkan response registrasi di konsol
  } catch (error) {
    console.error("Error registering user:", error); // Menampilkan error di konsol
    dispatch(setError("Registration failed! This email might already be registered. Please try again.")); // Actions untuk mengatur pesan error ke Reducers
    alert("Registration failed. This email might already be registered. Please try again.");
  }
};

//authme
export const fetchAuthUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token dari local storage
    if (!token) {
      throw new Error("Token not found in local storage"); // Alert jika token tidak ada
    }

    // Mengambil data pengguna
    const response = await axios.get("https://shy-cloud-3319.fly.dev/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Menggunakan token sebagai authorization
      },
    });
    const user = response.data.data; // Mendapatkan data pengguna dari response
    console.log("Data pengguna: ", user); // Menampilkan data pengguna di konsol
    dispatch(setUser(user)); // Mengatur data pengguna ke Reducers
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Failed to fetch user data."); // Menampilkan pesan error jika gagal mengambil data pengguna
    } else {
      alert("Error fetching user details."); // Menampilkan pesan error jika terjadi kesalahan lain
      console.error("Error: ", error);
    }
  }
};
