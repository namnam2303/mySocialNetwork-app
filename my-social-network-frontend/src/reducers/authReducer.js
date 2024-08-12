import { SET_CURRENT_USER, CLEAR_AUTH_STATE } from "../actions/type";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.payload).length,
        user: action.payload,
      };
    case CLEAR_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
}
