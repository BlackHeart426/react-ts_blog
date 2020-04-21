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
    LevelTier: [],
    Posts: [],
    Tasks: []
}

interface IAction {
    type: string,
    payload: any
}

export const blogReducer = (state:any = initialState, action: IAction) => {
    switch (action.type) {
        case SET_DATA_BLOG:
            return {...state,
                About: action.payload.About,
                Avatar: action.payload.Avatar,
                Background: action.payload.Background,
                Description: action.payload.Description,
                LevelTier: action.payload.LevelTier,
                Posts: action.payload.Posts,
                Tasks: action.payload.Tasks,
            }
        case UPDATE_DATA_BLOG:
            return {...state, [action.payload.name]: action.payload.value}
        default:
            return state
    }
}