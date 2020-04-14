import {SET_MY_PAGE} from "../types";

const initialState = {
    myPage: null
}

interface IAction {
    type: string,
    payload: object
}

export const currentUserReducer = (state:object = initialState, action: IAction) => {
    switch (action.type) {
        case SET_MY_PAGE:
            return {...state, myPage: action.payload }
        default:
            return state
    }
}