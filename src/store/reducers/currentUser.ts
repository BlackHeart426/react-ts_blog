import {SET_PAGEBLOG, ADD_SUBSCRIPTIONS, SET_SUBSCRIPTIONS, SET_AVATAR} from "../types"

const initialState = {
    myPage: null,
    subscriptions: [],
    avatar: ''
}

interface IAction {
    type: string,
    payload: object
}

export const currentUserReducer = (state: any = initialState, action: IAction) => {
    switch (action.type) {
        case SET_PAGEBLOG:
            return {...state, myPage: action.payload }
        case ADD_SUBSCRIPTIONS:
            return {...state, subscriptions: Object.values(state.subscriptions).concat(action.payload)}
        case SET_SUBSCRIPTIONS:
            return {...state, subscriptions: action.payload }
        case SET_AVATAR:
            return {...state, avatar: action.payload }
        default:
            return state
    }
}