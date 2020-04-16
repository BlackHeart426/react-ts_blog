import { authReducer } from "./authorization";
import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUser";
import {blogReducer} from "./blog";
import { appReducer } from "./app";

export default combineReducers({
    auth: authReducer,
    app: appReducer,
    currentUser: currentUserReducer,
    blog: blogReducer
})