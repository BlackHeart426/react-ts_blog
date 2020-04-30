import {EReduxActionTypes} from "./rootReducer";
import {IReduxOpenDrawerAction} from "../action/app";

// type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;
// type ActionTypes = ReturnType<InferValueTypes<typeof actions>>



export interface IReduxAppState {
    openDrawer: boolean,
}

const initialState: IReduxAppState = {
    openDrawer: false
}

type TAppReducerActions = IReduxOpenDrawerAction

export const appReducer = (state: IReduxAppState = initialState, action: TAppReducerActions) => {
    switch (action.type) {
        case EReduxActionTypes.OPEN_DRAWER:
            return {...state, openDrawer: !state.openDrawer }
        default:
            return state
    }
}