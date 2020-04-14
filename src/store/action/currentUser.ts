import {createPageFireBase, getPageBlogUserFireBase} from "../../firebase/database";
import {SET_MY_PAGE} from "../types";
import { Dispatch } from "redux";

export const userId: string|null = localStorage.getItem('userId');

export const createPageActionCreator = (name: string) => {
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

export const getBlogPageUserActionCreator = () => {
    return async (dispatch: Dispatch) => {
        if(userId) {
            try {
                await getPageBlogUserFireBase(userId)
                    .then((snapshot: any) => {
                        const myPage = snapshot.val().pageBlog
                        dispatch({ type: SET_MY_PAGE, payload: myPage });
                    })
            } catch (e) {
                // dispatch(showAlert('Что-то пошло не так'))
                // dispatch(hideLoader())
            }
        }
    }

}
