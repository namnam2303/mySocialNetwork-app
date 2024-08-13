import axios from "axios";
import { GET_LIST_FRIENDS, GET_ERRORS } from "./type";
import setAuthToken from "../utils/setAuthToken";
export const getListFriend = (username) => async (dispatch) => {
  try {
    console.log("get list friend of " + username);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
    const response = await axios.get(`api/friend/friends-list/${username}`);
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
