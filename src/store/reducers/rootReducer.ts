import { authReducer } from "./authorization";
import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUser";

export default combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer
})