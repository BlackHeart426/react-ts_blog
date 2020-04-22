import {SET_DATA_BLOG, UPDATE_DATA_BLOG, ADD_DATA_BLOG, REMOVE_DATA_BLOG, UPDATE_ARRAY_DATA_BLOG} from "../types";

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
        case UPDATE_ARRAY_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).map((item: any, index: number) => {
                if(item.uuid === action.payload.uuid){
                    item = action.payload.value
                }
                return item
                })}
        case ADD_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).concat(action.payload.value)} //Todo переписать
        case REMOVE_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).filter(item => console.log(item))}
        default:
            return state
    }
}