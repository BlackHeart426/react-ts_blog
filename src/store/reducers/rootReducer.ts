import { authReducer } from "./authorization";
import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUser";
import {blogReducer} from "./blog";

export default combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer,
    blog: blogReducer
})