import {SET_DATA_BLOG} from "../types";

const initialState = {
    dataBlog: {
        About: {
            title: '',
            description: ''
        },
        Avatar: {
            image: ''
        },
        Background: '',
        Description: {
            name: '',
            about: ''
        },
        LevelTier: {},
        Posts: {},
        Tasks: {}
    }
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