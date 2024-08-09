// reducers/timelineReducer.js

import { GET_TIMELINE } from "../actions/type";
const initialState = {
  timelineData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMELINE:
      return {
        ...state,
        timelineData: action.payload,
      };
    default:
      return state;
  }
}
