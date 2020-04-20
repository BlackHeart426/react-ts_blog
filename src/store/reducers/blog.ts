import {SET_DATA_BLOG, UPDATE_DATA_BLOG} from "../types";
import {Avatar} from "@material-ui/core";

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
    payload: any
}

export const blogReducer = (state:object = initialState, action: IAction) => {
    switch (action.type) {
        case SET_DATA_BLOG:
            return {...state, dataBlog: action.payload }
        case UPDATE_DATA_BLOG:
            return {...state, dataBlog: Object.values(state.dataBlog).forEach((item, index) => {
                    console.log(item)
                // item === action.payload.name && item.Background
                }) }
        default:
            return state
    }
}