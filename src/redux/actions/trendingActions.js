import axios from "axios";
import { setTrending, setNotFound, setSearchResults } from "../reducers/trendingReducers";

// Function to get trending TV shows
export const fetchTrending = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=acf7d069f0cf491ee86bd7170bf8a259&language=en-US`);
    dispatch(setTrending(response.data.results));
  } catch (error) {
    console.error("Error fetching trending shows: ", error);
  }
};

// Function to search TV shows
export const fetchSearchResults = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=acf7d069f0cf491ee86bd7170bf8a259&language=en-US&query=${query}`);
    if (response.data.results.length === 0) {
      dispatch(setNotFound(true));
    } else {
      dispatch(setNotFound(false));
    }
    // Dispatch hasil pencarian ke reducer Redux
    dispatch(setSearchResults(response.data.results));
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};
