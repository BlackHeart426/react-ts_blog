import { authReducer } from "./authorization";
import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUser";
import {blogReducer} from "./blog";
import { appReducer } from "./app";
import {EReduxActionTypes} from "../types";

export interface IReduxBaseAction {
    type: EReduxActionTypes
}

const rootReduce = combineReducers({
    auth: authReducer,
    app: appReducer,
    currentUser: currentUserReducer,
    blog: blogReducer
})

export type AppState = ReturnType<typeof rootReduce>

export default rootReduce