import {IS_AUTHENTICATION} from "../types";

export const isAuthorization = (state: boolean) => {
    return {
        type: IS_AUTHENTICATION,
        payload: state
    }
}