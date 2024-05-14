import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchAuthUser } from "../redux/actions/authActions";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Mengambil data user dari Reducers menggunakan useSelector

  // Mengambil data pengguna
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("Silahkan login terlebih dahulu!");
      navigate("/login");
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center", // Menengahkan konten di dalam div
      }}
    >
      <div className="text-center text-white">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4 py-8"> My Account </h1>
        <div className="item-center">
          <div className="border-4  bg-red-950 border-[#dcd2d2] max-w-[400px] w-full rounded-xl mt-10 mb-10 py-2 px-2 pb-5 pt-3 mr-14" style={{ margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="max-w-[450px] mx-auto flex flex-col justify-center items-center">
              <div className="" style={{ fontSize: "74px" }}>
                <RiAccountCircleFill />
              </div>
              <p className="text-3xl text-white font-semibold mt-10 mb-5 text-center">Welcome.</p>
              {user && (
                <>
                  <p className="text-2xl text-white font-bold mb-10">Annyeong, {user.name}!</p>

                  <div className="text-left text-white mt-7 mb-10">
                    <p className="font-medium">
                      <span className="mr-2">Name:</span>
                      {user.name}
                    </p>
                    <p className="font-medium">
                      <span className="mr-2">Email:</span>
                      {user.email}
                    </p>
                    <p className="font-medium">
                      <span className="mr-2">Joined:</span>
                      {user.createdAt}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
