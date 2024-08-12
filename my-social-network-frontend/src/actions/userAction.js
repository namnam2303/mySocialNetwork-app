// actions/userAction.js

import axios from "axios";
import { GET_USER_INFO, GET_ERRORS, GET_POSTS, GET_USER_POSTS } from "./type";
import setAuthToken from "../utils/setAuthToken";
// Action to get user info
export const getUserInfo = (username) => async (dispatch) => {
  try {
    console.log("get user infor action");
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    const res = await axios.get(`/api/user/${username}`);
    dispatch({
      type: GET_USER_INFO,
      payload: res.data, // Cập nhật state với thông tin người dùng
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Action to get timeline data
export const getTimeline = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/timeline/${username}`);
    console.log("get time line");
    dispatch({
      type: GET_POSTS,
      payload: res.data, // Cập nhật state với dữ liệu timeline
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Action to get all post of user
export const getPostOfUser = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/timeline/user/${username}`);
    console.log("get all posts of user");
    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
