import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import GoogleLogin from "./GoogleLogin";
import { setEmail, setPassword, setShowPassword, clearError } from "../redux/reducers/authReducers";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, showPassword, error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      // Membersihkan nilai email dan password saat komponen unmount
      dispatch(setEmail("")); // Mengatur email ke nilai kosong ke Reducers
      dispatch(setPassword("")); // Mengatur password ke nilai kosong ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
    };
  }, [dispatch]);

  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value)); // Actions untuk mengatur email ke Reducers
  };

  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value)); // Actions untuk mengatur password ke Reducers
  };

  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword)); // Actions untuk mengatur showPassword ke Reducers
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password!");
      return;
    }
    dispatch(loginUser(email, password, navigate)); // Mengirim actions login ke Reducers dengan email, password, dan navigate function
  };

  const handleRegistrationClick = () => {
    navigate("/register");
  };
  const passwordInputType = showPassword ? "text" : "password";

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-black to-red-800 flex flex-col h-screen items-center justify-center">
        <div className="border-2 p-12 rounded-lg shadow-lg bg-white flex flex-col items-center">
          <h1 className="text-2xl mb-4 font-bold text-center">Welcome</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-6 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <BsPeopleFill className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
                <input id="email" type="text" className="w-full focus:outline-none" placeholder="email" value={email} onChange={handleEmailChange} />
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
              Login
            </button>
            <p className="text-gray-500 font-semibold mb-2">
              Not Registered?
              <span onClick={handleRegistrationClick} className="text-blue-500 hover:text-blue-800 cursor-pointer ml-1">
                Create Account
              </span>
            </p>
          </form>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          <p className="mb-2 font-semibold text-gray-500">--- or --- </p>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
