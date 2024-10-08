import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  CLEAR_AUTH_STATE,
} from "./type";
import setAuthToken from "../utils/setAuthToken";
import { jwtDecode as jwt_decode } from "jwt-decode";
// Đăng nhập - Lấy JWT token
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    // Xóa lỗi trước khi gửi yêu cầu
    dispatch(clearErrors());
    const res = await axios.post("/api/auth/login", userData);
    console.log("login");
    const { token, user } = res.data;
    // Lưu token vào localStorage
    localStorage.setItem("jwtToken", token);
    // Set token vào tiêu đề Authorization của Axios
    setAuthToken(token);
    // Decode token để lấy user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser({ ...decoded, ...user }));
    navigate("/home");
  } catch (error) {
    const errorData = error.response
      ? error.response.data
      : { message: "An error occurred" };
    dispatch({
      type: GET_ERRORS,
      payload: errorData,
    });
  }
};

// Set current user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// Xóa lỗi
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// Register User
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    // Clear previous errors
    dispatch(clearErrors());
    console.log("register" + userData);
    // Send registration data to the backend
    await axios.post("/api/auth/register", userData);
    // Redirect to login form
    navigate("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Clear the current user and set isAuthenticated to false
  dispatch({ type: CLEAR_AUTH_STATE });
  // Reset Axios interceptors
  axios.interceptors.response.handlers = [];
};
// ... Các action hiện có ...

// Request Password Reset
export const requestPasswordReset = (email) => (dispatch) => {
  return axios
    .post("/api/password-reset/request", { email })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return Promise.reject(err.response.data);
    });
};

// Reset Password
export const resetPassword = (token, newPassword) => (dispatch) => {
  return axios
    .post("/api/password-reset/reset", { token, password: newPassword })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return Promise.reject(err.response.data);
    });
};
