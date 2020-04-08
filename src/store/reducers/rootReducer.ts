import { authReducer } from "./authorization";
import { combineReducers } from "redux";

export default combineReducers({
    auth: authReducer
})