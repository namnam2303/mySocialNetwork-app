import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import { commentReducer } from "./commentReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  comment: commentReducer,
  // Add other reducers here
});

export default rootReducer;
