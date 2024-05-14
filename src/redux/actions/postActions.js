import axios from "axios";
import { setDetailPost, setPosts } from "../reducers/postReducers";

//function to get all posts
export const getAllPosts = () => async (dispatch, getState) => {
  try {
    console.log("getState", getState());
    const token = getState().todo.token;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    dispatch(setPosts(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

//function to get post
export const getPost = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`);
    dispatch(setDetailPost(response.data));
    return response.data;
  } catch (error) {
    //alert (error.message);
    return "Error bro";
  }
};
