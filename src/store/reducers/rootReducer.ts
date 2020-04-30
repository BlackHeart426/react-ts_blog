import { authReducer } from "./authorization";
import { combineReducers } from "redux";
import { currentUserReducer } from "./currentUser";
import {blogReducer} from "./blog";
import { appReducer } from "./app";

export enum EReduxActionTypes {
    IS_AUTHENTICATED = 'AUTH/IS_AUTHENTICATED',
    OPEN_DRAWER = 'APP/OPEN_DRAWER'
}

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