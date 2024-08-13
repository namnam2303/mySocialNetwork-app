import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import { commentReducer } from "./commentReducer";
import userReducer from "./userReducer";
import friendReducer from "./friendReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  comment: commentReducer,
  user: userReducer,
  friend: friendReducer,
  // Add other reducers here
});

export default rootReducer;
