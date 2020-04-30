import {IS_AUTHENTICATED} from "../types";

const initialState = {
    isAuthenticated: null
}

interface IAction {
    type: string,
    payload: boolean
}

export interface IAuthState {
    isAuthenticated: boolean
}

export const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {...state, isAuthenticated: action.payload }
        default:
            return state
    }
}