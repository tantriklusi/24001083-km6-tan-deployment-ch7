import axios from "axios";
import { setPeople } from "../reducers/peopleReducers";

// Function to get people
export const fetchPopularPeople = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=acf7d069f0cf491ee86bd7170bf8a259&language=en-US`);
    dispatch(setPeople(response.data.results));
    // console.log("data", response.data.results);
  } catch (error) {
    console.error("Error fetching trending shows: ", error);
  }
};
