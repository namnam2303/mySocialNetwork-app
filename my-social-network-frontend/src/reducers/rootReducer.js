import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import { commentReducer } from "./commentReducer";
import userReducer from "./userReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  comment: commentReducer,
  user: userReducer,
  // Add other reducers here
});

export default rootReducer;
