import {IS_AUTHENTICATED, SET_DATA_BLOG, UPDATE_DATA_BLOG} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword, doGoogleSignIn, doPasswordReset,
    doSignInWithEmailAndPassword,
    doSignOut
} from "../../firebase/auth";
import { Dispatch } from "redux";
import firebase from "firebase";
import {TOKEN, USERID, EXPIRATIONDATE, EMAIL} from "../../constants/localStorage";
import {getDataPageBlogFireBase, updateBlogDataFireBase} from "../../firebase/database";
import cookie from "react-cookies";

export const getDataBlogActionCreator = (nameBlog: string) => {
    return async (dispatch: any) => {
        getDataPageBlogFireBase(nameBlog)
            .then((snapshot: any) => {
                const dataBlog = snapshot.val()
                dispatch({ type: SET_DATA_BLOG, payload: dataBlog });
                console.log('response', dataBlog)
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}

export const updateDataBlogActionCreator = (name: string, value: any) => {
    const myPage = cookie.load('myPage')
    return async (dispatch: any) => {
        updateBlogDataFireBase(myPage, name, value)
            .then(response => {
                // dispatch({ type: UPDATE_DATA_BLOG, payload: {name, value} });
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}