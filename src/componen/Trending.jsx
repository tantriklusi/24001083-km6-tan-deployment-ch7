import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, fetchTrending } from "../redux/actions/trendingActions";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Trending() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trending = useSelector((state) => state.tv.trending);
  const searchResults = useSelector((state) => state.tv.searchResults); // Ambil hasil pencarian dari state Redux
  const [query, setQuery] = useState("");
  const [selectTime, setSelectTime] = useState("day");

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("Silahkan login terlebih dahulu!");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTrending(selectTime));
  }, [dispatch, selectTime]);

  const handleTime = (event) => {
    const selectedTime = event.target.value;
    setSelectTime(selectedTime); // Mengatur nilai selectTime sesuai dengan pilihan pengguna
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      dispatch(fetchSearchResults(value)); // Menggunakan action creator dengan Redux dispatch
    } else {
      // Jika query kosong, tidak perlu dispatch apapun, Redux state akan direset secara otomatis
    }
  };

  const handleClear = () => {
    setQuery("");
    alert("Yakin mau dihapus nih??");
  };

  return (
    <div className="text-center text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Trending TV</h1>
      <div className="flex justify-center mb-4">
        <input type="text" value={query} onChange={handleSearch} placeholder="Search TV Shows" className="border border-gray-500 rounded-md px-20 py-2 mr-2 text-black" />
        <button onClick={handleClear} className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-700">
          Clear
        </button>
        <select value={selectTime} onChange={handleTime} className="select-cst px-4 py-2 mr-2 ml-2 border-2 rounded-md text-red-950">
          <option value="day">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-5 px-16 py-8">
        {(query ? searchResults : trending).map((show) => (
          <div key={show?.id} className="flex flex-col border-2 gap-y-2 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center">
            <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-2 relative">
              <img className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]" src={`https://image.tmdb.org/t/p/w500/${show?.poster_path}`} alt="" />
              <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show?.title} className="max-w-44 rounded-sm hover:border-[10px] transition-all duration-150 ease-in" />
            </div>
            <h2 className="font-bold px-4">{show?.name}</h2>
            <h2 className="font-bold px-4">Release date : {show?.first_air_date}</h2>
            <h2 className="text-lg font-semibold ">⭐ {show?.vote_average.toFixed(1)}</h2>
            <button
              className="px-4 py-2 mr-2 bg-gray-500 rounded-md hover:bg-gray-700"
              onClick={() => {
                navigate("/detail", { state: { series_id: show.id } });
              }}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
