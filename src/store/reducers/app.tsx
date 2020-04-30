import {OPEN_DRAWER} from "../types";
import * as actions from '../action/app'

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;
type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const initialState = {
    alert: false,
    openDrawer: false
}

interface StateType {
    openDrawer: boolean,
    alert: boolean
}


export const appReducer = (state: StateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return {...state, openDrawer: action.payload }
        default:
            return state
    }
}