import { GET_POSTS, ADD_POST, DELETE_POST } from "../actions/type";

const initialState = {
  postList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        postList: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        postList: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        postList: state.post.filter(
          (post) => post.id !== action.payload.publicId
        ),
      };
    default:
      return state;
  }
}
