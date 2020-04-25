import {SET_PAGEBLOG, ADD_SUBSCRIPTIONS, SET_SUBSCRIPTIONS, SET_AVATAR, UPDATE_USER_DATA} from "../types"

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
        case SET_AVATAR:
            return {...state, Avatar: action.payload }
        default:
            return state
    }
}