import {
    createPageBlogFireBase,
    createUserFireBase,
    getDataPageBlogFireBase,
    getPageBlogUserFireBase
} from "../../firebase/database";
import {SET_MY_PAGE, DATA_USER_BLOG} from "../types";
import { Dispatch } from "redux";
import cookie from 'react-cookies'



export const userId: string|null = localStorage.getItem('userId');

export const createUserActionCreator = (name: string) => {
    if(userId) {
        createUserFireBase(userId)
            .then(response => {
                console.log('response', response)
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const createPageActionCreator = (name: string) => {
    if(userId) {
        return async (dispatch: any) => {
            await createPageBlogFireBase(name)
        }
    }
}

export const getDataPageBlogActionCreator = (userId: string) => {
    let flagUserExist = null;
    return async (dispatch: any) => {
        getPageBlogUserFireBase(userId)
            .then((snapshot: any) => {
                console.log('getDataPageBlogActionCreator',snapshot.val())
                if (snapshot.val()) {
                    dispatch(setDataUserBlogActionCreator(snapshot.val())) // add subscription resux
                    return flagUserExist = true;
                } else {
                    createUserFireBase(userId)
                        .then(response => {
                            console.log('response', response)
                        })
                        .catch(error => {
                            console.error('error',error)
                        })
                }
            })
            .catch(error =>{
                debugger
                return flagUserExist = false;
            })
    }

}

export const setDataUserBlogActionCreator = (dataUser: any) => {
    return {
        type: DATA_USER_BLOG,
        payload: dataUser
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
