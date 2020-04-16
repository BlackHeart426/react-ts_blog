import {createPageBlogFireBase, createPageFireBase, getPageBlogUserFireBase} from "../../firebase/database";
import {SET_MY_PAGE} from "../types";
import { Dispatch } from "redux";
import cookie from 'react-cookies'

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
            await createPageBlogFireBase(name)
        }
    }
}

export const getBlogPageUserActionCreator = (userId: string|null) => {
    console.log('userId', userId)
    return async (dispatch: Dispatch) => {
        const myPage = cookie.load('myPage')
        console.log('myPage',myPage)
        if(!myPage) {
            if(userId) {
                try {
                    await getPageBlogUserFireBase(userId)
                        .then((snapshot: any) => {
                            const myPage = snapshot.val().pageBlog
                            cookie.save('myPage', myPage, {path : '/'})
                            dispatch({type: SET_MY_PAGE, payload: myPage});
                        })
                } catch (e) {
                    // dispatch(showAlert('Что-то пошло не так'))
                    // dispatch(hideLoader())
                }
            } else {
                dispatch({type: SET_MY_PAGE, payload: null});
            }
        } else {
            dispatch({type: SET_MY_PAGE, payload: myPage});
        }
    }

}
