import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, GET_POSTS } from "./type";
import axios from "axios";

export const createPost = (username, content, image) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("create post action");
    const response = await axios.post(
      `/api/post/${username}`,
      formData,
      config
    );

    dispatch({
      type: GET_POSTS,
      payload: response.data,
    });
  } catch (error) {
    const errors =
      error.response && error.response.data
        ? error.response.data
        : { message: "An unknown error occurred" };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
  }
};

export const deletePost = (publicId) => async (dispatch) => {
  try {
    console.log("delete post with id " + publicId);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    await axios.delete(`api/post/${publicId}`);
  } catch (error) {
    const errors =
      error.response && error.response.data
        ? error.response.data
        : { message: "An unknown error occurred" };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
  }
};
