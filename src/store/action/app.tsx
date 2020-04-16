import {OPEN_DRAWER} from "../types";

export const openDrawerActionCreator = (open: boolean) => {
    return {
        type: OPEN_DRAWER,
        payload: open
    }

}