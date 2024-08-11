import { CREATE_COMMENT, GET_ERRORS } from "./type";
import axios from "axios";

const createComment =
  (postPublicId, username, commentData) => async (dispatch) => {
    try {
      console.log("get comments action");
      const response = await axios.post(
        `/api/comment/${postPublicId}/${username}`,
        commentData
      );
      dispatch({
        type: CREATE_COMMENT,
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

export default createComment;
