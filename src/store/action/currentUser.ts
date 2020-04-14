import {createPageFireBase} from "../../firebase/database";
import {SET_MY_PAGE} from "../types";

export const createPageActionCreator = (name: string) => {
    const userId = localStorage.getItem('userId');
    if(userId) {
        return async (dispatch: any) => {
            await createPageFireBase(name, userId)
                .then(response => {
                    dispatch({ type: SET_MY_PAGE, payload: name });
                    console.log('response', response)
                })
                .catch(error => {
                    console.error('error',error)
                })
        }
    }

}
