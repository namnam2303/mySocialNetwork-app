import { GET_LIST_FRIENDS, GET_PROFILE_FRIENDS } from "../actions/type";

const initialState = {
  friendList: [],
  profileFriendList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FRIENDS:
      return {
        ...state,
        friendList: action.payload,
      };
    case GET_PROFILE_FRIENDS:
      return {
        ...state,
        profileFriendList: action.payload,
      };
    default:
      return state;
  }
}
