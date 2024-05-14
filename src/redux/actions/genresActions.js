import axios from "axios";
import { setTVGenres, setSelectedGenre, setFilteredShows } from "../reducers/genresReducers";

const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";

export const fetchTVGenres = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    dispatch(setTVGenres(response.data.genres));
    dispatch(setSelectedGenre("35")); // Default genre
  } catch (err) {
    console.log("error fetching TV genres: ", err);
  }
};

export const fetchFilteredShows = (genreId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });
    dispatch(setFilteredShows(response.data.results));
  } catch (err) {
    console.log("error fetching filtered shows: ", err);
  }
};
