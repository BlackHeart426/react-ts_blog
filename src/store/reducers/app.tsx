import {OPEN_DRAWER} from "../types";

export const initialState = {
    alert: null,
    openDrawer: false
}

interface IAction {
    type: string,
    payload: () => {alert: boolean, openDrawer: boolean}
}

export const appReducer = (state: object = initialState, action: IAction) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return {...state, openDrawer: action.payload }
        default:
            return state
    }
}