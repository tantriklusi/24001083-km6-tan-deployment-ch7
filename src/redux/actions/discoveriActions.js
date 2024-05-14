import axios from "axios";
import { setDiscoveri } from "../reducers/discoveriReducers";

// Function to get onair TV shows
export const fetchDiscoveri = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=acf7d069f0cf491ee86bd7170bf8a259&language=en-US`);
    dispatch(setDiscoveri(response.data.results));
  } catch (error) {
    console.error("Error fetching trending shows: ", error);
  }
};
