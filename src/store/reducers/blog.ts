import {SET_DATA_BLOG, SET_MY_PAGE} from "../types";

const initialState = {
    dataBlog: null
}

interface IAction {
    type: string,
    payload: object
}

export const blogReducer = (state:object = initialState, action: IAction) => {
    switch (action.type) {
        case SET_DATA_BLOG:
            return {...state, dataBlog: action.payload }
        default:
            return state
    }
}