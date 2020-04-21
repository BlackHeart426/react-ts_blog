import {SET_DATA_BLOG, UPDATE_DATA_BLOG} from "../types";

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
    Tiers: [],
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
                Tiers: action.payload.Tiers,
                Posts: action.payload.Posts,
                Tasks: action.payload.Tasks,
            }
        case UPDATE_DATA_BLOG:
            return {...state, [action.payload.name]: action.payload.value} //Todo переписать
        default:
            return state
    }
}