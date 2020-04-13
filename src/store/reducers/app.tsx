import {IS_AUTHENTICATED} from "../types";

const initialState = {
    alert: null
}

interface IAction {
    type: string,
    payload: object
}

export const authReducer = (state:object = initialState, action: IAction) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {...state, isAuthenticated: action.payload }
        default:
            return state
    }
}