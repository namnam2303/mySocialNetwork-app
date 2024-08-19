import axios from "axios";
import { GET_LIST_FRIENDS, GET_ERRORS, GET_PROFILE_FRIENDS } from "./type";
import setAuthToken from "../utils/setAuthToken";

export const getListFriend = (username) => async (dispatch) => {
  try {
    console.log("get list friend of " + username);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    const response = await axios.get(`/api/friend/friends-list/${username}`);
    dispatch({
      type: GET_LIST_FRIENDS,
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
export const getListFriendOfUser = (username) => async (dispatch) => {
  try {
    console.log("get list friend of " + username);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    const response = await axios.get(`/api/friend/friends-list/${username}`);
    dispatch({
      type: GET_PROFILE_FRIENDS,
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
export const sendFriendRequest =
  (username, friendUsername) => async (dispatch) => {
    try {
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }
      await axios.post(`/api/friend/${username}/${friendUsername}`);
      // After sending request, update friend list
      dispatch(getListFriend(username));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const acceptFriendRequest =
  (username, friendUsername) => async (dispatch) => {
    try {
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }
      await axios.put(`/api/friend/accept/${friendUsername}`, { username });
      // After accepting request, update friend list
      dispatch(getListFriend(username));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

// Reject friend request
export const rejectFriendRequest =
  (username, friendUsername) => async (dispatch) => {
    try {
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }
      await axios.put(`/api/friend/reject/${friendUsername}`, { username });
      // After rejecting request, update friend list
      dispatch(getListFriend(username));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

// Unfriend
export const unfriend = (username, friendUsername) => async (dispatch) => {
  try {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    await axios.delete(`/api/friend/${username}/${friendUsername}`);
    // After unfriending, update friend list
    dispatch(getListFriend(username));
  } catch (error) {
    handleError(error, dispatch);
  }
};

const handleError = (error, dispatch) => {
  const errors =
    error.response && error.response.data
      ? error.response.data
      : { message: "An unknown error occurred" };
  dispatch({
    type: GET_ERRORS,
    payload: errors,
  });
};
