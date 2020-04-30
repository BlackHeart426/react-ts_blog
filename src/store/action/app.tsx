import {EReduxActionTypes, IReduxBaseAction} from "../reducers/rootReducer";

export interface IReduxOpenDrawerAction extends IReduxBaseAction{
    type: EReduxActionTypes.OPEN_DRAWER
}

export const openDrawerActionCreator = (): IReduxOpenDrawerAction => {
    return {
        type: EReduxActionTypes.OPEN_DRAWER
    }

}