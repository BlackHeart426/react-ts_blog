import {ADD_DATA_BLOG, EReduxActionTypes, REMOVE_DATA_BLOG, UPDATE_ARRAY_DATA_BLOG, UPDATE_DATA_BLOG} from "../types";
import {
    IReduxAddDataBlogAction,
    IReduxGetDataBlogAction,
    IReduxRemoveDataBlogAction,
    IReduxUpdateArrayData,
    IReduxUpdateDataBlogAction,
    IReduxUpdateLikeCommentDataBlogAction
} from "../action/blog";


const initialState: IReduxBlogState = {
    About: '',
    Avatar: '',
    Background: '',
    Description: {
        name: '',
        about: ''
    },
    Tiers: [],
    Posts: [],
    Tasks: [],
    Subscriptions: []
}

export interface IBlogSetData {
    About: string,
    Avatar: string,
    Background: string,
    Description: {
        name: string,
        about: string
    },
    Tiers: [],
    Posts: [],
    Tasks: [],
    Subscriptions: []
}
export interface IReduxBlogState {
    About: string,
    Avatar: string,
    Background: string,
    Description: {
        name: string,
        about: string
    },
    Tiers: [],
    Posts: [],
    Tasks: [],
    Subscriptions: []
}

interface IAction {
    type: string,
    payload: any
}

type TBlogReducerActions = IReduxGetDataBlogAction
    | IReduxRemoveDataBlogAction
    | IReduxUpdateDataBlogAction
    | IReduxUpdateArrayData
    | IReduxUpdateLikeCommentDataBlogAction
    | IReduxAddDataBlogAction

export const blogReducer = (state:any = initialState, action: IAction) => {
    switch (action.type) {
        case EReduxActionTypes.SET_DATA_BLOG:
            return {...state,
                About: action.payload.About,
                Avatar: action.payload.Avatar,
                Background: action.payload.Background,
                Description: action.payload.Description,
                Tiers: action.payload.Tiers,
                Posts: action.payload.Posts,
                Tasks: action.payload.Tasks,
                Subscriptions: action.payload.Subscriptions,
            }
        case EReduxActionTypes.UPDATE_DATA_BLOG:
            return {...state, [action.payload.name]: action.payload.value} //Todo переписать
        case EReduxActionTypes.UPDATE_ARRAY_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).map((item: any, index: number) => {
                    if(item.uuid === action.payload.uuid){
                        item = action.payload.value
                    }
                    return item
                })}
        case EReduxActionTypes.ADD_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).concat(action.payload.value)} //Todo переписать
        case EReduxActionTypes.REMOVE_DATA_BLOG:
            return {...state, [action.payload.name]: Object.values(state[action.payload.name]).filter((item: any) => {
                    if(item.uuid !== action.payload.uuid) {
                        return item
                    }
                })}
        default:
            return state
    }
}