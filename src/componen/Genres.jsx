import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { fetchFilteredShows, fetchTVGenres } from "../redux/actions/genresActions";

const GenresTV = () => {
  const TVGenres = useSelector((state) => state.genre.Genres);
  const filteredShows = useSelector((state) => state.genre.filteredShows);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTVGenres());
  }, [dispatch]);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("Silahkan login terlebih dahulu!");
      navigate("/login");
    }
  }, []);

  const handleGenreChange = async (event) => {
    const genreId = event.target.value;
    dispatch(fetchFilteredShows(genreId));
  };

  return (
    <div className="text-center text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">TV Genres</h1>
      <select onChange={handleGenreChange} className="select-cst px-4 py-2 mr-2 ml-2 border-2 rounded-md text-red-950">
        {TVGenres &&
          TVGenres.map((genre) => (
            <option key={genre.id} value={genre.id} selected={genre.id === 35}>
              {genre.name}
            </option>
          ))}
      </select>
      <div className="grid grid-cols-5 gap-4 mt-5 px-16 py-8">
        {filteredShows?.length > 0 ? (
          filteredShows.map((show) => (
            <div key={show.id} className="flex flex-col border-2 gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center">
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt="" />
                <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt={show.name} className="max-w-44 rounded-sm hover:border-[10px] transition-all duration-150 ease-in" />
              </div>
              <h2 className="font-bold px-5">{show.name}</h2>
              <h2 className="font-bold px-4">Release date : {show.first_air_date}</h2>
              <h2 className="text-lg items-center font-semibold">⭐ {show?.popularity}</h2>
              <button
                className="px-4 py-2 mr-2 bg-gray-500 rounded-md hover:bg-gray-700"
                onClick={() => {
                  navigate("/detail", { state: { series_id: show.id } });
                }}
              >
                Detail
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil yang ditemukan.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GenresTV;
