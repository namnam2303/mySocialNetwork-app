// reducers/userReducer.js

import { GET_USER_INFO } from "../actions/type";
const initialState = {
  userInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
