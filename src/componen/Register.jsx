import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useGoogleLogin } from "@react-oauth/google";
import { MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { registerUser } from "../redux/actions/authActions";
import GoogleLogin from "./GoogleLogin";
import { setEmail, setName, setPassword, setShowPassword, clearError } from "../redux/reducers/authReducers";

export default function RegisterUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name, password, showPassword, error } = useSelector((state) => state.auth); // Mengambil data dari Reducers menggunakan useSelector

  useEffect(() => {
    return () => {
      // Membersihkan nilai email dan password saat komponen unmount
      dispatch(setEmail("")); // Mengatur email ke nilai kosong ke Reducers
      dispatch(setName("")); // Mengatur nama ke nilai kosong ke Reducers
      dispatch(setPassword("")); // Mengatur password ke nilai kosong ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
    };
  }, [dispatch]);

  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value)); // Actions untuk mengatur email ke Reducers
  };

  const handleNameChange = (event) => {
    dispatch(clearError());
    dispatch(setName(event.target.value)); // Actions untuk mengatur nama ke Reducers
  };

  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value)); // Actions untuk mengatur password ke Reducers
  };

  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword)); // Actions untuk mengatur showPassword ke Reducers
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!email || !name || !password) {
      alert("Please fill in all data first.");
      return;
    }

    if (!email.includes("@")) {
      alert("Email must contain '@' character.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, including uppercase letters and numbers.");
      return;
    }

    dispatch(registerUser(email, name, password, navigate)); // Mengirim actions register ke Reducers dengan email, name, password, dan navigate function
  };

  const passwordInputType = showPassword ? "text" : "password"; // Menentukan tipe input untuk password

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-black to-red-800 flex flex-col h-screen items-center justify-center">
        <div className="border-2 p-12 rounded-lg shadow-lg bg-white flex flex-col items-center">
          <h1 className="text-2xl mb-4 font-bold text-center">Register</h1>
          <form onSubmit={handleRegister} className="w-full max-w-sm">
            <div className="mb-6 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <MdEmail className="mr-2" />
                <input id="email" type="email" className="w-full focus:outline-none" placeholder="email" value={email} onChange={handleEmailChange} />
              </div>
            </div>
            <div className="mb-6 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <BsPersonFill className="mr-2" />
                <input id="name" type="text" className="w-full focus:outline-none" placeholder="name" value={name} onChange={handleNameChange} />
              </div>
            </div>
            <div className="mb-6 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <BiSolidLock className="mr-2" />
                <input id="password" type={passwordInputType} className="w-full focus:outline-none" placeholder="password" value={password} onChange={handlePasswordChange} />
                <div className="ml-2">{showPassword ? <BiShow onClick={togglePasswordVisibility} className="cursor-pointer" /> : <BiHide onClick={togglePasswordVisibility} className="cursor-pointer" />}</div>
              </div>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full">
              Register Now
            </button>
          </form>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          <p className="mb-2 font-semibold text-gray-500">--- or --- </p>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
