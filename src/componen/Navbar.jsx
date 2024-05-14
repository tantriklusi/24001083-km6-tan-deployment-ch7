import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiAccountCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [more, setMore] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isActive, setIsActive] = useState(false); // State untuk menentukan apakah dropdown sedang aktif
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Mengubah status login berdasarkan keberadaan token
  }, []);

  // Meng-handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/"); // Navigasi kembali ke halaman landing page setelah logout
      alert("Logout Successful!");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/people" || location.pathname === "/onair" || location.pathname === "/discover") {
      setMore(true);
    } else {
      setMore(false);
    }
  }, [location]);

  return (
    <nav className="pt-2 pb-2 px-2 w-full z-5 bg-stone-800  bg-opacity-45">
      <div className="text-red-800 flex justify-between text-xl px-8 py-8">
        <p className="flex items-center text-3xl">
          <Link to="/" className="text-5xl font-bold font-sans">
            {/* <img src="https://cdn6.f-cdn.com/contestentries/1133045/25197601/59badfd1555fc_thumb900.jpg" alt="Logo" className="w-10 h-10 mr-2" /> */}
            <strong>TVidio</strong>
          </Link>
        </p>
        <div className="container flex justify-end items-center">
          <ul className="flex justify-center align-center">
            <li>
              <Link to="/" className="mx-5 hover:underline hover:text-white font-bold">
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/login" className="mx-5 hover:underline hover:text-white font-bold">
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/trending" className="mx-2 hover:underline hover:text-white font-bold">
                    Trending TV
                  </Link>
                </li>
                <li>
                  <Link to="/genre" className="mx-2 hover:underline hover:text-white font-bold">
                    Genres
                  </Link>
                </li>
                {/* Dropdown for "More" */}
                {more ? (
                  <>
                    <li className="relative">
                      <button
                        onClick={toggleDropdown}
                        className={`mx-2 hover:underline font-bold ${isActive ? "text-red-800" : "hover:text-white"}`} // Menggunakan ternary operator untuk menentukan warna teks
                      >
                        More
                      </button>
                      {showDropdown && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-stone-800 ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link to="/auth" className="flex items-center justify-center px-4 py-2 text-red-800 hover:underline hover:bg-red-800 hover:text-white font-bold">
                              <div style={{ marginRight: "5px" }}>
                                <RiAccountCircleFill />
                              </div>
                              Account
                            </Link>
                            <Link to="/onair" className="block px-4 py-2 text-red-800 hover:underline hover:bg-red-800 hover:text-white font-bold">
                              OnAir TV
                            </Link>
                            <Link to="/discover" className="block px-4 py-2 text-red-800 hover:underline hover:bg-red-800 hover:text-white font-bold">
                              Discoveri TV
                            </Link>
                            <Link to="/people" className="block px-4 py-2 text-red-800 hover:underline hover:bg-red-800 hover:text-white font-bold">
                              People
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMore(true);
                    }}
                    className="mx-2 hover:underline hover:text-white font-bold"
                  >
                    More
                  </button>
                )}
                <li>
                  <Link onClick={handleLogout} className="mx-5 hover:underline  hover:text-white font-bold">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
