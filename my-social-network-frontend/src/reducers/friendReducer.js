import { GET_LIST_FRIENDS } from "../actions/type";

const initialState = {
  friendList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}
