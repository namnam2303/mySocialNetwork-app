// reducers/userReducer.js

import { GET_USER_INFO, GET_USER_POSTS } from "../actions/type";
const initialState = {
  userInfo: {},
  userPosts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    default:
      return state;
  }
}
