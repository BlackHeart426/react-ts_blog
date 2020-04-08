import {IS_AUTHENTICATION} from "../types";

const initialState = {
    isAuthorization: false
}

interface IAction {
    type: string,
    payload: object
}

export const authReducer = (state:object = initialState, action: IAction) => {
    switch (action.type) {
        case IS_AUTHENTICATION:
            return {...state, isAuthorization: action.payload }
    }
}