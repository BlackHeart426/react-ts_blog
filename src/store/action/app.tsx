import {IReduxBaseAction} from "../reducers/rootReducer";
import { EReduxActionTypes } from "../types";

export interface IReduxOpenDrawerAction extends IReduxBaseAction{
    type: EReduxActionTypes.OPEN_DRAWER
}

export const openDrawerActionCreator = (): IReduxOpenDrawerAction => {
    return {
        type: EReduxActionTypes.OPEN_DRAWER
    }

}