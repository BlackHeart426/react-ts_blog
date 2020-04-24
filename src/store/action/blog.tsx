import {
    ADD_DATA_BLOG,
    IS_AUTHENTICATED,
    REMOVE_DATA_BLOG,
    SET_DATA_BLOG,
    UPDATE_ARRAY_DATA_BLOG,
    UPDATE_DATA_BLOG
} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword, doGoogleSignIn, doPasswordReset,
    doSignInWithEmailAndPassword,
    doSignOut
} from "../../firebase/auth";
import { Dispatch } from "redux";
import firebase from "firebase";
import {TOKEN, USERID, EXPIRATIONDATE, EMAIL} from "../../constants/localStorage";
import {
    addArrayBlogDataFireBase,
    addRowBlogDataFireBase,
    getDataPageBlogFireBase, removeArrayBlogDataFireBase,
    updateBlogDataFireBase,
    updateArrayBlogDataFireBase
} from "../../firebase/database";
import cookie from "react-cookies";
const myPage = cookie.load('myPage')
export const getDataBlogActionCreator = (nameBlog: string = myPage) => {
    return async (dispatch: any) => {
        if(nameBlog) {
            getDataPageBlogFireBase(nameBlog)
                .then((snapshot: any) => {
                    const dataBlog = snapshot.val()
                    dispatch({ type: SET_DATA_BLOG, payload: dataBlog });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }
        }

}

export const removeDataBlogActionCreator = (name: string, uuid: string) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        removeArrayBlogDataFireBase(myPage, name, uuid)
            .then(
                dispatch({type: REMOVE_DATA_BLOG, payload: {name, uuid}})
            )
            .catch(error => {
                console.error(error)
            })
    }
}

export const updateDataBlogActionCreator = (name: string, value: any) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        updateBlogDataFireBase(myPage, name, value)
            .then(response => {
                dispatch({ type: UPDATE_DATA_BLOG, payload: {name, value} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}
//добавить проверку пользователя
export const updateArrayDataBlogActionCreator = (name: string, value: any, uuid: string) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        updateArrayBlogDataFireBase(myPage, name, value, uuid)
            .then(response => {
                dispatch({ type: UPDATE_ARRAY_DATA_BLOG, payload: {name, value, uuid} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const updateLikeCommentDataBlogActionCreator = (nameBlog: string ,name: string, value: any, uuid: string) => {
    return async (dispatch: any) => {
        updateArrayBlogDataFireBase(nameBlog, name, value, uuid)
            .then(response => {
                dispatch({ type: UPDATE_ARRAY_DATA_BLOG, payload: {name, value, uuid} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const addDataBlogActionCreator = (name: string, value: any, array: boolean = false) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        if(array) {
            addArrayBlogDataFireBase(myPage, name, value)
                .then(response => {
                    dispatch({ type: ADD_DATA_BLOG, payload: {name, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        } else {
            addRowBlogDataFireBase(myPage, name, value)
                .then(response => {
                    dispatch({ type: UPDATE_DATA_BLOG, payload: {name, value} });
                })
                .catch(error => {
                    console.error('error',error)
                })
        }
    }
}