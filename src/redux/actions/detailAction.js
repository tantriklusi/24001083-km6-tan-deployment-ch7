import axios from "axios";
import { setDetail } from "../reducers/detailReducers";

export const fetchDetail = (series_id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${series_id}?language=en-US&api_key=acf7d069f0cf491ee86bd7170bf8a259`, { headers: { accept: "application/json" } });
    dispatch(setDetail(response.data));
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching movie detail: ", error);
  }
};
