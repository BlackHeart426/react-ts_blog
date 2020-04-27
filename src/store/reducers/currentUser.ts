import {
    SET_PAGEBLOG,
    ADD_SUBSCRIPTIONS,
    SET_SUBSCRIPTIONS,
    SET_AVATAR,
    UPDATE_USER_DATA,
    UPDATE_ARRAY_DATA_BLOG,
    UPDATE_ARRAY_DATA_USER
} from "../types"

const initialState = {
    myPage: null,
    subscriptions: [],
    Avatar: ''
}

interface IAction {
    type: string,
    payload: any
}

export const currentUserReducer = (state: any = initialState, action: IAction) => {
    switch (action.type) {
        case SET_PAGEBLOG:
            return {...state, myPage: action.payload }
        case ADD_SUBSCRIPTIONS:
            return {...state, subscriptions: Object.values(state.subscriptions).concat(action.payload)}
        case SET_SUBSCRIPTIONS:
            return {...state, subscriptions: action.payload }
        case UPDATE_USER_DATA:
            return {...state, [action.payload.nameColumn]: action.payload.value}
        case UPDATE_ARRAY_DATA_USER:
            return {...state, subscriptions: Object.values(state.subscriptions).map((item: any, index: number) => {
                    if(item.uuid === action.payload.uuid){
                        item.tier = action.payload.tier
                    }
                    return item
                })}
        case SET_AVATAR:
            return {...state, Avatar: action.payload }
        default:
            return state
    }
}