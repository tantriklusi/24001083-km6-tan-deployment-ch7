import axios from "axios";
import { setOnAir, setData } from "../reducers/onairReducers"; // Perbaiki nama file reducers dan import

// Function to get onair TV shows
export const fetchOnAir = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=acf7d069f0cf491ee86bd7170bf8a259&language=en-US`);
    dispatch(setOnAir(response.data.results));
    dispatch(setData(response.data.results));
  } catch (error) {
    console.error("Error fetching trending shows: ", error);
  }
};

// export const sortOnAirAction = (selectTime, data) => {
//   // Ubah nama fungsi menjadi sortOnAir
//   return (dispatch) => {
//     const sortedOnAir = data.slice().sort((a, b) => {
//       if (selectTime === "Ascending") {
//         return a.vote_average - b.vote_average;
//       } else {
//         return b.vote_average - a.vote_average;
//       }
//     });
//     dispatch(sortOnAir(sortedOnAir));
//   };
// };
