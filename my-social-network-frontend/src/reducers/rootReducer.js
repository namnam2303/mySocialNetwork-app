import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  // Add other reducers here
});

export default rootReducer;
