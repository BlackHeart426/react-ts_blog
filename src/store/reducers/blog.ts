import {SET_DATA_BLOG, UPDATE_DATA_BLOG} from "../types";
import {Avatar} from "@material-ui/core";

const initialState = {
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

interface IAction {
    type: string,
    payload: any
}

export const blogReducer = (state:any = initialState, action: IAction) => {
    switch (action.type) {
        case SET_DATA_BLOG:
            return action.payload
        case UPDATE_DATA_BLOG:
            const data = action.payload
            return {...state, [data.name]: data.value}
        default:
            return state
    }
}